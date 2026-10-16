import { google } from 'googleapis'

export interface Slot {
  iso: string       // ISO 8601 datetime
  label: string     // Human-readable, e.g. "Mon 12 May · 10:00 AM WAT (UTC+1)"
}

export interface BookingResult {
  confirmed: boolean
  meetLink?: string
  slotLabel: string
}

const BUSINESS_TZ = 'Africa/Lagos'

function formatSlotLabel(date: Date): string {
  const time = date.toLocaleString('en-US', {
    weekday: 'short', day: 'numeric', month: 'short',
    hour: 'numeric', minute: '2-digit',
    timeZone: BUSINESS_TZ,
  })
  const tzAbbr = new Intl.DateTimeFormat('en-US', { timeZone: BUSINESS_TZ, timeZoneName: 'short' })
    .formatToParts(date).find(p => p.type === 'timeZoneName')!.value
  const utcOffset = new Intl.DateTimeFormat('en-US', { timeZone: BUSINESS_TZ, timeZoneName: 'shortOffset' })
    .formatToParts(date).find(p => p.type === 'timeZoneName')!.value.replace('GMT', 'UTC')
  return `${time} ${tzAbbr} (${utcOffset})`
}

function getOAuth2Client() {
  const auth = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID!,
    process.env.GMAIL_CLIENT_SECRET!,
  )
  auth.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN! })
  return auth
}

export async function getAvailableSlots(): Promise<Slot[]> {
  // Returns fixed slots for next 5 business days at 9h, 11h, 14h, 16h WAT.
  // To use live availability, query the Calendar free/busy API:
  //   POST https://www.googleapis.com/calendar/v3/freeBusy
  //   body: { timeMin, timeMax, items: [{ id: GOOGLE_CALENDAR_ID }] }

  const slots: Slot[] = []
  const now = new Date()

  let day = new Date(now)
  day.setHours(9, 0, 0, 0)

  const daysAdded: Date[] = []
  while (daysAdded.length < 5) {
    day = new Date(day.getTime() + 24 * 60 * 60 * 1000)
    const dow = day.getDay()
    if (dow !== 0 && dow !== 6) daysAdded.push(new Date(day))
  }

  const hours = [9, 11, 14, 16]
  for (const d of daysAdded) {
    for (const h of hours) {
      const slot = new Date(d)
      slot.setHours(h, 0, 0, 0)
      slots.push({ iso: slot.toISOString(), label: formatSlotLabel(slot) })
    }
  }

  return slots
}

export async function bookSlot(
  name: string,
  email: string,
  slot_iso: string,
): Promise<BookingResult> {
  const auth      = getOAuth2Client()
  const startTime = new Date(slot_iso)
  const endTime   = new Date(startTime.getTime() + 30 * 60 * 1000)

  // Step 1 — Create a Google Meet space
  const { token: accessToken } = await auth.getAccessToken()
  const meetRes = await fetch('https://meet.googleapis.com/v2/spaces', {
    method:  'POST',
    headers: {
      Authorization:  `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })

  if (!meetRes.ok) {
    const detail = await meetRes.text()
    throw new Error(`Meet API ${meetRes.status}: ${detail}`)
  }

  const meetSpace = await meetRes.json() as { meetingUri: string; meetingCode: string }
  const meetingUri = meetSpace.meetingUri

  // Step 2 — Create Calendar event with the Meet URI attached
  const calendar = google.calendar({ version: 'v3', auth })

  await calendar.events.insert({
    calendarId:  process.env.GOOGLE_CALENDAR_ID!,
    sendUpdates: 'all',
    requestBody: {
      summary:     `Discovery Call — ${name}`,
      description: `BaobabAI 30-minute discovery call.\nGoogle Meet: ${meetingUri}`,
      location:    meetingUri,
      start: { dateTime: startTime.toISOString(), timeZone: BUSINESS_TZ },
      end:   { dateTime: endTime.toISOString(),   timeZone: BUSINESS_TZ },
      attendees:     [{ email }],
      conferenceData: {
        conferenceSolution: {
          key:     { type: 'hangoutsMeet' },
          name:    'Google Meet',
        },
        entryPoints: [{
          entryPointType: 'video',
          uri:   meetingUri,
          label: meetingUri.replace('https://', ''),
        }],
        conferenceId: meetSpace.meetingCode,
      },
    },
  })

  return {
    confirmed: true,
    meetLink:  meetingUri,
    slotLabel: formatSlotLabel(startTime),
  }
}
