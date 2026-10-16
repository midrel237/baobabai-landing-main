import { google } from 'googleapis'

export interface BookingConfirmation {
  name: string
  email: string
  slot_iso: string
  meetLink?: string
}

const BUSINESS_TZ = 'Africa/Lagos'

function getGmailClient() {
  const auth = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID!,
    process.env.GMAIL_CLIENT_SECRET!,
  )
  auth.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN! })
  return google.gmail({ version: 'v1', auth })
}

function buildRawMessage(to: string, subject: string, html: string): string {
  const from = process.env.GMAIL_FROM!
  const mime = [
    `From: BaobabAI <${from}>`,
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    '',
    html,
  ].join('\r\n')
  return Buffer.from(mime).toString('base64url')
}

export async function sendConfirmationEmail(booking: BookingConfirmation): Promise<void> {
  const slotDate = new Date(booking.slot_iso)
  const timeStr = slotDate.toLocaleString('en-US', {
    weekday: 'long', day: 'numeric', month: 'long',
    hour: 'numeric', minute: '2-digit',
    timeZone: BUSINESS_TZ,
  })
  const tzAbbr = new Intl.DateTimeFormat('en-US', { timeZone: BUSINESS_TZ, timeZoneName: 'short' })
    .formatToParts(slotDate).find(p => p.type === 'timeZoneName')!.value
  const utcOffset = new Intl.DateTimeFormat('en-US', { timeZone: BUSINESS_TZ, timeZoneName: 'shortOffset' })
    .formatToParts(slotDate).find(p => p.type === 'timeZoneName')!.value.replace('GMT', 'UTC')
  const slotLabel = `${timeStr} ${tzAbbr} (${utcOffset})`

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F2F4F7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:12px;overflow:hidden;max-width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#0F172A;padding:32px 40px;">
            <p style="margin:0;font-size:20px;font-weight:700;color:#FFFFFF;letter-spacing:-0.02em;">
              Baobab<span style="color:#D4A017;">AI</span>
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:0.12em;color:#D4A017;text-transform:uppercase;">
              Confirmed
            </p>
            <h1 style="margin:0 0 24px;font-size:24px;font-weight:700;color:#0F172A;line-height:1.2;">
              Your discovery call is booked.
            </h1>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.6;color:#475569;">
              Hi ${booking.name}, we're looking forward to speaking with you.
              Here are your call details:
            </p>

            <!-- Slot box -->
            <table width="100%" cellpadding="0" cellspacing="0"
              style="background:#F2F4F7;border-radius:8px;margin-bottom:32px;">
              <tr>
                <td style="padding:24px 28px;">
                  <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#94A3B8;letter-spacing:0.1em;text-transform:uppercase;">Date &amp; Time</p>
                  <p style="margin:0;font-size:17px;font-weight:600;color:#0F172A;">${slotLabel}</p>
                  ${booking.meetLink ? `
                  <p style="margin:16px 0 4px;font-size:12px;font-weight:600;color:#94A3B8;letter-spacing:0.1em;text-transform:uppercase;">Google Meet</p>
                  <a href="${booking.meetLink}" style="color:#083D2E;font-size:15px;font-weight:500;">${booking.meetLink}</a>
                  ` : ''}
                </td>
              </tr>
            </table>

            <p style="margin:0 0 32px;font-size:14px;line-height:1.65;color:#475569;">
              We'll use this call to understand your operations, identify automation opportunities,
              and figure out the best way we can help. No sales pitch — just a focused conversation.
            </p>

            ${booking.meetLink ? `
            <a href="${booking.meetLink}"
              style="display:inline-block;padding:14px 28px;background:#D4A017;color:#0F172A;font-size:14px;font-weight:700;text-decoration:none;border-radius:8px;letter-spacing:-0.01em;">
              Join the call
            </a>
            ` : ''}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #F2F4F7;">
            <p style="margin:0;font-size:12px;color:#94A3B8;line-height:1.6;">
              BaobabAI · Deep roots. Global impact.<br>
              Questions? Reply to this email or reach us at hello@baobabai.com
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`.trim()

  const gmail = getGmailClient()
  await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw: buildRawMessage(booking.email, `Your BaobabAI discovery call — ${slotLabel}`, html) },
  })
}
