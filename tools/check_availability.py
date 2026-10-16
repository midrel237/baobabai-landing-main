#!/usr/bin/env python3
"""
Tool: check_availability
Returns available 30-minute discovery call slots for the next 5 business days.

Usage:
    python tools/check_availability.py --timezone Africa/Lagos

Output (stdout, JSON):
    {"slots": [{"iso": "2026-05-12T09:00:00Z", "label": "Mon 12 May · 9:00 AM"}, ...]}
"""

import argparse
import json
import sys
from datetime import datetime, timedelta, timezone

# ---------------------------------------------------------------------------
# Backends — uncomment one
# ---------------------------------------------------------------------------

def _mock_slots(tz_name: str) -> list[dict]:
    """Return mock slots for the next 5 business days (no API needed)."""
    try:
        from zoneinfo import ZoneInfo
        tz = ZoneInfo(tz_name)
    except Exception:
        from datetime import timezone as dt_tz
        tz = dt_tz.utc

    slots = []
    day = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
    business_days = 0
    hours = [9, 11, 14, 16]

    while business_days < 5:
        day += timedelta(days=1)
        if day.weekday() >= 5:   # skip Saturday (5) and Sunday (6)
            continue
        business_days += 1
        for h in hours:
            slot_utc = day.replace(hour=h)
            slot_local = slot_utc.astimezone(tz)
            slots.append({
                'iso':   slot_utc.isoformat(),
                'label': slot_local.strftime('%a %-d %b · %-I:%M %p'),
            })

    return slots


# def _calendly_slots(tz_name: str) -> list[dict]:
#     """Fetch from Calendly API."""
#     import requests, os
#     from datetime import date
#     headers = {'Authorization': f'Bearer {os.environ["CALENDLY_API_KEY"]}'}
#     params  = {
#         'event_type': os.environ['CALENDLY_EVENT_TYPE_UUID'],
#         'start_time': date.today().isoformat() + 'T00:00:00Z',
#         'end_time':   (date.today() + timedelta(days=7)).isoformat() + 'T23:59:59Z',
#     }
#     r = requests.get('https://api.calendly.com/event_type_available_times', headers=headers, params=params)
#     r.raise_for_status()
#     return [{'iso': s['start_time'], 'label': s['start_time']} for s in r.json().get('collection', [])]


def get_slots(timezone: str) -> list[dict]:
    return _mock_slots(timezone)
    # return _calendly_slots(timezone)   # swap when Calendly is configured


# ---------------------------------------------------------------------------
# CLI entry point
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description='Return available booking slots.')
    parser.add_argument('--timezone', default='Africa/Lagos', help='IANA timezone string')
    args = parser.parse_args()

    try:
        slots = get_slots(args.timezone)
        print(json.dumps({'slots': slots}))
    except Exception as e:
        print(json.dumps({'slots': [], 'error': str(e)}), file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
