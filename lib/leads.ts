import { google } from 'googleapis'

export interface Lead {
  name: string
  email: string
  company?: string
  use_case?: string
  budget_range?: string
  timeline?: string
  score?: number
  intent?: string
  status?: string
  source?: string
}

// Row layout: Name | Email | Company | Use Case | Budget Range | Timeline | Score | Intent | Status | Source | Captured At
const RANGE = 'Leads!A:K'

function getSheetClient() {
  const credentials = JSON.parse(
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON!
      .replace(/\\r\\n/g, ' ')
      .replace(/\\"/g, '"')
  )
  credentials.private_key = credentials.private_key.replace(/\\n/g, '\n')
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return google.sheets({ version: 'v4', auth })
}

export async function captureLead(lead: Lead): Promise<void> {
  const sheets = getSheetClient()
  const row = [
    lead.name,
    lead.email,
    lead.company ?? '',
    lead.use_case ?? '',
    lead.budget_range ?? '',
    lead.timeline ?? '',
    lead.score ?? '',
    lead.intent ?? '',
    lead.status ?? 'New',
    lead.source ?? 'Website',
    new Date().toISOString(),
  ]

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_LEADS_SHEET_ID!,
    range: RANGE,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  })
}
