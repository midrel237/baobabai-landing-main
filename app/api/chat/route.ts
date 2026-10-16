/**
 * Agent Layer — Lead Qualification Agent
 *
 * WAT Framework:
 *   Workflow  → workflows/lead_qualification.md   (SOP: goals, flow, edge cases)
 *   Agent     → this file                         (reads workflow, orchestrates Gemini + tools)
 *   Tools     → lib/leads.ts, lib/calendar.ts, lib/email.ts  (deterministic execution)
 *
 * To change agent behaviour, edit the workflow file — not this file.
 */

import fs from 'fs'
import path from 'path'
import {
  GoogleGenerativeAI,
  FunctionDeclaration,
  SchemaType,
  Content,
} from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import { captureLead } from '@/lib/leads'
import { getAvailableSlots, bookSlot } from '@/lib/calendar'
import { sendConfirmationEmail } from '@/lib/email'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// Load the workflow SOP once at module init (cached across requests in the same instance)
const workflow = fs.readFileSync(
  path.join(process.cwd(), 'workflows', 'lead_qualification.md'),
  'utf-8'
)

const SYSTEM_PROMPT = `You are operating as BaobabAI's AI intake assistant.
Read and follow the workflow below exactly. It defines your goals, conversation flow, tools, and how to handle edge cases.

---
${workflow}
---

Important: never narrate tool calls to the visitor. Execute them silently and continue the conversation naturally.`

// ---------------------------------------------------------------------------
// Tool definitions (Gemini FunctionDeclaration format)
// ---------------------------------------------------------------------------

const functionDeclarations: FunctionDeclaration[] = [
  {
    name: 'capture_lead',
    description: 'Save visitor contact info, use case, qualification score, and intent. Call this as soon as name and email are collected.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        name:                { type: SchemaType.STRING, description: "Visitor's full name" },
        email:               { type: SchemaType.STRING, description: "Visitor's email address" },
        company:             { type: SchemaType.STRING, description: "Visitor's company name (optional)" },
        use_case:            { type: SchemaType.STRING, description: 'What they want to automate or the problem they described' },
        budget_range:        { type: SchemaType.STRING, description: 'Budget range or indication (e.g. "under $5k", "exploratory", "$10k+")' },
        timeline:            { type: SchemaType.STRING, description: 'How soon they need this (e.g. "30 days", "exploratory", "Q3")' },
        qualification_score: { type: SchemaType.NUMBER, description: 'Lead score 0–100 based on budget clarity, urgency, scope, and fit' },
        intent:              { type: SchemaType.STRING, description: 'Classified intent: service_inquiry | partnership | information | spam' },
      },
      required: ['name', 'email'],
    },
  },
  {
    name: 'check_availability',
    description: 'Returns 3 available 30-minute discovery call slots for the next 5 business days. Only call when lead score ≥ 70 and visitor agreed to book.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {},
    },
  },
  {
    name: 'book_appointment',
    description: 'Books a 30-minute discovery call for the visitor.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        name:     { type: SchemaType.STRING, description: "Visitor's full name" },
        email:    { type: SchemaType.STRING, description: "Visitor's email address" },
        slot_iso: { type: SchemaType.STRING, description: 'ISO 8601 datetime of the chosen slot' },
      },
      required: ['name', 'email', 'slot_iso'],
    },
  },
]

// ---------------------------------------------------------------------------
// Tool execution (calls the deterministic lib/* tools)
// ---------------------------------------------------------------------------

type ToolInput = Record<string, string | number>

async function executeTool(name: string, input: ToolInput): Promise<object> {
  const start = Date.now()

  try {
    if (name === 'capture_lead') {
      await captureLead({
        name:         input.name as string,
        email:        input.email as string,
        company:      input.company as string | undefined,
        use_case:     input.use_case as string | undefined,
        budget_range: input.budget_range as string | undefined,
        timeline:     input.timeline as string | undefined,
        score:        input.qualification_score as number | undefined,
        intent:       input.intent as string | undefined,
      })
      log('tool', name, input, { ok: true }, Date.now() - start)
      return { ok: true }
    }

    if (name === 'check_availability') {
      const allSlots = await getAvailableSlots()
      const slots = allSlots.slice(0, 3)
      log('tool', name, input, { slots }, Date.now() - start)
      return { slots }
    }

    if (name === 'book_appointment') {
      const result = await bookSlot(input.name as string, input.email as string, input.slot_iso as string)
      if (result.confirmed) {
        try {
          await sendConfirmationEmail({
            name:     input.name as string,
            email:    input.email as string,
            slot_iso: input.slot_iso as string,
            meetLink: result.meetLink,
          })
        } catch (emailErr) {
          // Email failure doesn't cancel the booking — log and continue
          log('tool_error', 'sendConfirmationEmail', { email: input.email }, {
            error: emailErr instanceof Error ? emailErr.message : String(emailErr),
          }, Date.now() - start)
        }
      }
      log('tool', name, input, result, Date.now() - start)
      return result
    }

    return { error: `unknown tool: ${name}` }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    log('tool_error', name, input, { error: message }, Date.now() - start)
    return { error: message }
  }
}

// ---------------------------------------------------------------------------
// Message format conversion: frontend → Gemini Content[]
// Frontend sends [{role: 'user'|'assistant', content: string}]
// Gemini expects [{role: 'user'|'model', parts: [{text: string}]}]
// ---------------------------------------------------------------------------

function toGeminiContents(messages: { role: string; content: string }[]): Content[] {
  return messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))
}

// ---------------------------------------------------------------------------
// Observability logging
// ---------------------------------------------------------------------------

function log(
  event: string,
  name: string,
  input: unknown,
  output: unknown,
  durationMs?: number,
): void {
  console.log(JSON.stringify({
    workflow: 'lead_qualification',
    event,
    name,
    input,
    output,
    durationMs: durationMs ?? null,
    timestamp: new Date().toISOString(),
  }))
}

// ---------------------------------------------------------------------------
// Rate limiting (in-memory, resets on cold start)
// ---------------------------------------------------------------------------

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT  = 30
const RATE_WINDOW = 60 * 60 * 1000   // 1 hour

function checkRateLimit(ip: string): boolean {
  const now   = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

// ---------------------------------------------------------------------------
// Route handler — the agent loop
// ---------------------------------------------------------------------------

const model = genAI.getGenerativeModel({
  model: 'gemini-3.1-flash-lite',
  systemInstruction: SYSTEM_PROMPT,
  tools: [{ functionDeclarations }],
})

async function generateWithRetry(contents: Content[]) {
  try {
    return await model.generateContent({ contents })
  } catch (err: unknown) {
    const status = (err as { status?: number }).status
    // Retry once on transient overload; never retry quota errors (429)
    if (status === 503) {
      await new Promise((r) => setTimeout(r, 2000))
      return await model.generateContent({ contents })
    }
    throw err
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many messages. Please try again later.' }, { status: 429 })
  }

  const body = await req.json()
  const rawMessages: { role: string; content: string }[] = body.messages ?? []

  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return NextResponse.json({ error: 'messages array is required' }, { status: 400 })
  }

  let contents: Content[] = toGeminiContents(rawMessages)

  // Agent loop: run until Gemini gives a final text response (no more function calls)
  for (let step = 0; step < 8; step++) {
    let result
    try {
      result = await generateWithRetry(contents)
    } catch (err: unknown) {
      const status = (err as { status?: number }).status
      const message = err instanceof Error ? err.message : String(err)
      log('llm_error', 'generateContent', { step }, { error: message, status })
      return NextResponse.json(
        { message: "I'm having trouble connecting right now. Please try again in a moment." },
        { status: 503 },
      )
    }

    const response = result.response
    const functionCalls = response.functionCalls()

    log('llm_turn', 'generateContent', { step }, {
      hasFunctionCalls: !!functionCalls?.length,
      functionNames: functionCalls?.map((c) => c.name) ?? [],
    })

    // No function calls → final text response
    if (!functionCalls || functionCalls.length === 0) {
      return NextResponse.json({ message: response.text() })
    }

    // Execute all requested tool calls
    const toolResults = await Promise.all(
      functionCalls.map(async (call) => ({
        functionResponse: {
          name: call.name,
          response: await executeTool(call.name, call.args as ToolInput),
        },
      }))
    )

    // Append model's function call turn + tool results, then loop
    contents = [
      ...contents,
      { role: 'model', parts: response.candidates![0].content.parts },
      { role: 'user',  parts: toolResults },
    ]
  }

  return NextResponse.json(
    { message: "I'm sorry, something went wrong. Please try again." },
    { status: 500 }
  )
}
