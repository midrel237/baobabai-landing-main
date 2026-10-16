#!/usr/bin/env python3
"""
Tool: book_appointment
Books a 30-minute discovery call and sends a confirmation email.

Usage:
    python tools/book_appointment.py \
        --name "Raouf M" --email "r@co.com" \
        --slot_iso "2026-05-13T14:00:00Z" --timezone "Africa/Lagos"

Output (stdout, JSON):
    {"confirmed": true, "slot_label": "Tue 13 May · 3:00 PM", "meet_link": "https://..."}
"""

import argparse
import json
import sys
import os
from datetime import datetime, timezone

# ---------------------------------------------------------------------------
# Backends — uncomment the one you want
# ---------------------------------------------------------------------------

def _mock_book(name: str, email: str, slot_iso: str, tz_name: str) -> dict:
    """Log the booking locally and return a placeholder Meet link."""
    try:
        from zoneinfo import ZoneInfo
        tz = ZoneInfo(tz_name)
    except Exception:
        from datetime import timezone as dt_tz
        tz = dt_tz.utc

    slot_utc   = datetime.fromisoformat(slot_iso.replace('Z', '+00:00'))
    slot_local = slot_utc.astimezone(tz)
    label      = slot_local.strftime('%A %-d %B · %-I:%M %p')
    meet_link  = 'https://meet.google.com/placeholder-link'

    # Append to local log
    log_path = os.path.join(os.path.dirname(__file__), '..', '.tmp', 'bookings.jsonl')
    os.makedirs(os.path.dirname(log_path), exist_ok=True)
    with open(log_path, 'a', encoding='utf-8') as f:
        f.write(json.dumps({
            'name':       name,
            'email':      email,
            'slot_iso':   slot_iso,
            'slot_label': label,
            'timezone':   tz_name,
            'meet_link':  meet_link,
            'booked_at':  datetime.now(timezone.utc).isoformat(),
        }) + '\n')

    return {'confirmed': True, 'slot_label': label, 'meet_link': meet_link}


# def _google_calendar_book(name: str, email: str, slot_iso: str, tz_name: str) -> dict:
#     """Create a Google Calendar event with a Meet link and email the invitee."""
#     from google.oauth2 import service_account
#     from googleapiclient.discovery import build
#     from datetime import timedelta
#     import os
#
#     creds = service_account.Credentials.from_service_account_info(
#         json.loads(os.environ['GOOGLE_SERVICE_ACCOUNT_JSON']),
#         scopes=['https://www.googleapis.com/auth/calendar'],
#     )
#     service = build('calendar', 'v3', credentials=creds)
#
#     start = datetime.fromisoformat(slot_iso.replace('Z', '+00:00'))
#     end   = start + timedelta(minutes=30)
#
#     event = service.events().insert(
#         calendarId=os.environ['GOOGLE_CALENDAR_ID'],
#         conferenceDataVersion=1,
#         sendUpdates='all',
#         body={
#             'summary':  f'BaobabAI Discovery Call — {name}',
#             'start':    {'dateTime': start.isoformat(), 'timeZone': tz_name},
#             'end':      {'dateTime': end.isoformat(),   'timeZone': tz_name},
#             'attendees': [{'email': email}],
#             'conferenceData': {
#                 'createRequest': {'requestId': f'baobab-{slot_iso}-{email}'},
#             },
#         },
#     ).execute()
#
#     meet_link  = event.get('hangoutLink', '')
#     slot_local = start.astimezone(__import__('zoneinfo').ZoneInfo(tz_name))
#     label      = slot_local.strftime('%A %-d %B · %-I:%M %p')
#     return {'confirmed': True, 'slot_label': label, 'meet_link': meet_link}


def book(name: str, email: str, slot_iso: str, timezone: str) -> dict:
    return _mock_book(name, email, slot_iso, timezone)
    # return _google_calendar_book(name, email, slot_iso, timezone)


# ---------------------------------------------------------------------------
# CLI entry point
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description='Book a 30-min discovery call.')
    parser.add_argument('--name',     required=True, help="Visitor's full name")
    parser.add_argument('--email',    required=True, help="Visitor's email address")
    parser.add_argument('--slot_iso', required=True, help='ISO 8601 datetime of chosen slot')
    parser.add_argument('--timezone', required=True, help='IANA timezone string')
    args = parser.parse_args()

    try:
        result = book(args.name, args.email, args.slot_iso, args.timezone)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({'confirmed': False, 'error': str(e)}), file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
