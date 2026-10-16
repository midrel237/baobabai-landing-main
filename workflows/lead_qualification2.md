# Lead Qualification Agent Workflow Spec (BaobabAI)

## 1. Overview
This document defines a complete, production-ready specification for a **Lead Qualification AI Agent** embedded on a landing page. The agent engages website visitors in conversation, extracts relevant business information, qualifies leads, and automatically performs structured actions:

- Capture lead identity (name, email, company if available)
- Understand intent and project scope
- Qualify lead (score + category)
- Store structured data in Google Sheets
- Schedule meetings in Google Calendar
- Trigger notifications (optional)

The system is designed for **deterministic execution**, ensuring consistent outputs regardless of conversation variability.

---

## 2. High-Level Architecture

### Components
- **Frontend Chat Widget (Next.js)**
- **AI Orchestrator (Spring Boot API)**
- **LLM Layer (OpenAI / Claude / Gemini)**
- **Automation Layer (n8n optional or direct API calls)**
- **Data Storage (Google Sheets + PostgreSQL optional)**
- **Calendar Service (Google Calendar API)**

### Flow Overview
```
User → Chat Widget → Orchestrator API → LLM Engine
                                      ↓
                        Structured JSON Extraction
                                      ↓
     Google Sheets ← Data Storage → Calendar Scheduling
                                      ↓
                               Confirmation Message
```

---

## 3. Core Agent Objectives

The agent must:

1. Engage naturally with website visitors
2. Extract structured lead information:
   - Full name
   - Email address
   - Company (optional)
   - Project description
   - Budget range (optional)
   - Timeline (optional)
3. Determine intent:
   - Inquiry
   - Service request
   - Partnership
   - Spam / irrelevant
4. Assign qualification score (0–100)
5. Trigger next actions:
   - Save lead
   - Schedule meeting
   - Notify team

---

## 4. Deterministic Execution Rules

The agent MUST follow strict deterministic rules:

### Rule 1: Structured Output First
Every LLM response must produce:
```json
{
  "intent": "string",
  "lead": {
    "name": "string|null",
    "email": "string|null",
    "company": "string|null",
    "project": "string|null"
  },
  "qualification_score": 0,
  "next_action": "ASK_MORE | SAVE_LEAD | SCHEDULE_MEETING | REJECT",
  "missing_fields": []
}
```

### Rule 2: No Action Without Required Fields
- Email is REQUIRED before saving or scheduling
- Name is REQUIRED for CRM entry

### Rule 3: State Machine Behavior
- STEP 1: Discovery
- STEP 2: Qualification
- STEP 3: Data Completion
- STEP 4: Scheduling
- STEP 5: Closure

---

## 5. Conversation Flow Design

### Step 1: Greeting
"Hello 👋 How can I help you today?"

### Step 2: Intent Capture
Agent identifies purpose:
- Service inquiry
- Pricing question
- Demo request

### Step 3: Lead Enrichment
Agent asks:
- Name
- Email
- Project details

### Step 4: Qualification
Agent evaluates:
- Budget
- Urgency
- Business fit

### Step 5: Scheduling
If qualified:
- Offer calendar slots
- Book meeting automatically

---

## 6. Qualification Scoring Model

| Criteria        | Weight |
|----------------|--------|
| Budget clarity  | 30     |
| Urgency        | 25     |
| Project scope  | 25     |
| Fit to service | 20     |

### Interpretation
- 80–100 → High priority
- 50–79 → Medium priority
- <50 → Low priority / nurture

---

## 7. Google Sheets Data Schema

| Column Name        | Type     | Description |
|-------------------|----------|-------------|
| timestamp         | datetime | Lead capture time |
| name              | string   | Full name |
| email             | string   | Email address |
| company           | string   | Company name |
| project           | string   | Project description |
| score             | number   | Qualification score |
| status            | string   | New / Qualified / Scheduled |
| meeting_time      | datetime | Scheduled slot |
| source            | string   | Website / Ad / Organic |

---

## 8. Calendar Scheduling Logic

### Rules:
- Only schedule if score ≥ 70
- Must confirm email before booking
- Offer 3 time slots

### Calendar Flow:
1. Fetch availability
2. Suggest slots
3. User selects
4. Create Google Calendar event
5. Send confirmation email

---

## 9. API Endpoints (Spring Boot)

### POST /api/agent/message
Handles chat input

### POST /api/agent/extract
Extract structured data

### POST /api/lead/save
Stores lead in Google Sheets

### POST /api/calendar/schedule
Creates meeting event

---

## 10. Prompt Engineering Template

### System Prompt
You are a deterministic lead qualification agent. You MUST always return structured JSON and never skip fields.

### Behavioral Constraints
- No hallucination of emails or names
- Ask clarifying questions if missing data
- Always optimize for conversion

---

## 11. Error Handling

### Missing Email
→ Ask user politely

### Invalid Email
→ Request correction

### No Response
→ Retry prompt after 30s

### API Failure
→ Queue in retry system (n8n or backend job)

---

## 12. Observability & Logging

Log every interaction:
- user message
- extracted JSON
- decision state
- API calls

Store logs in:
- PostgreSQL or Elasticsearch

---

## 13. Tech Stack

- Frontend: Next.js + Tailwind
- Backend: Spring Boot (Java)
- Automation: n8n
- LLM: OpenAI / Claude / Gemini
- Database: PostgreSQL
- CRM Storage: Google Sheets API

---

## 14. Security Considerations

- Validate all emails
- Rate limit chat requests
- Protect API endpoints with token authentication
- Avoid storing sensitive personal data beyond lead info

---

## 15. Future Enhancements

- Multi-language support (FR/EN)
- WhatsApp integration
- Voice-based agent
- AI lead scoring improvement via ML model
- CRM integration (HubSpot, Salesforce)

---

## 16. Summary
This system is designed to convert website visitors into qualified leads through a structured, deterministic AI workflow that integrates seamlessly with Google Sheets and Calendar automation.

---

End of specification.

