import csv
import os
from datetime import datetime
import gspread
from google.oauth2.service_account import Credentials


CSV_FILE = "expenses.csv"
SHEET_NAME = "Expense Tracker"

sheet = None  # global sheet instance


def init_google_sheet():
    global sheet

    scope = [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive"
    ]

    creds = Credentials.from_service_account_file(
        "telegram_bot/google_credentials.json",
        scopes=scope
    )

    client = gspread.authorize(creds)
    sheet = client.open(SHEET_NAME).worksheet("expenses")


def save_expense(expense, user_id):
    global sheet

    date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    row = [
        user_id,
        date,
        expense["category"],
        expense["description"],
        expense["amount"]
    ]

    # Save to CSV
    file_exists = os.path.isfile(CSV_FILE)

    with open(CSV_FILE, mode="a", newline="") as file:
        writer = csv.writer(file)
        if not file_exists:
            writer.writerow(["user_id", "date", "category", "description", "amount"])
        writer.writerow(row)

    # Save to Google Sheet
    try:
        if sheet:
            sheet.append_row(row)
    except Exception as e:
        print("Google Sheets error:", e)

def save_user(user):
    global sheet

    try:
        client = sheet.spreadsheet
        users_sheet = client.worksheet("users")

        row = [
            user["user_id"],
            user["username"],
            user["first_name"],
            datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        ]

        users_sheet.append_row(row)

    except Exception as e:
        print("Users sheet error:", e)

def get_user_summary(user_id):
    global sheet

    if not sheet:
        return {}

    try:
        records = sheet.get_all_records()
    except Exception as e:
        print("Sheet read error:", e)
        return {}

    category_totals = {}

    for row in records:
        if str(row["User_id"]) == str(user_id):
            category = row["Category"]
            amount = float(row["Amount"])

            if category not in category_totals:
                category_totals[category] = 0

            category_totals[category] += amount

    return category_totals