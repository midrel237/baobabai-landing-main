#!/usr/bin/env python3
"""
Tool: capture_lead
Appends a qualified lead to a Google Sheet.

Setup:
    pip install google-auth google-api-python-client
    Set GOOGLE_SERVICE_ACCOUNT_JSON and GOOGLE_LEADS_SHEET_ID in .env

Usage:
    python tools/capture_lead.py --name "Raouf M" --email "r@co.com" \
        --company "AcmeCorp" --use_case "Automate customer support tickets"

Output (stdout, JSON):
    {"ok": true}
    or
    {"ok": false, "error": "..."}
"""

import argparse
import json
import os
import sys
from datetime import datetime, timezone


def _append_to_sheet(lead: dict) -> None:
    from googleapiclient.discovery import build
    from google.oauth2 import service_account

    creds = service_account.Credentials.from_service_account_info(
        json.loads(os.environ['GOOGLE_SERVICE_ACCOUNT_JSON']),
        scopes=['https://www.googleapis.com/auth/spreadsheets'],
    )
    service = build('sheets', 'v4', credentials=creds)

    row = [
        lead['name'],
        lead['email'],
        lead.get('company', ''),
        lead.get('use_case', ''),
        lead['captured_at'],
    ]

    service.spreadsheets().values().append(
        spreadsheetId=os.environ['GOOGLE_LEADS_SHEET_ID'],
        range='Leads!A:E',
        valueInputOption='USER_ENTERED',
        body={'values': [row]},
    ).execute()


def save_lead(name: str, email: str, company: str = '', use_case: str = '') -> None:
    lead = {
        'name':         name,
        'email':        email,
        'company':      company,
        'use_case':     use_case,
        'captured_at':  datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC'),
    }
    _append_to_sheet(lead)


def main():
    parser = argparse.ArgumentParser(description='Capture a qualified lead into Google Sheets.')
    parser.add_argument('--name',     required=True,  help="Visitor's full name")
    parser.add_argument('--email',    required=True,  help="Visitor's email address")
    parser.add_argument('--company',  default='',     help="Visitor's company (optional)")
    parser.add_argument('--use_case', default='',     help='What they want to automate')
    args = parser.parse_args()

    try:
        save_lead(args.name, args.email, args.company, args.use_case)
        print(json.dumps({'ok': True}))
    except Exception as e:
        print(json.dumps({'ok': False, 'error': str(e)}), file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
