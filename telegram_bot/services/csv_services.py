import csv
import os
from datetime import datetime

CSV_FILE = "expenses.csv"

def save_expense(expense_data: dict):
    file_exists = os.path.isfile(CSV_FILE)

    with open(CSV_FILE, mode="a", newline="") as file:
        writer = csv.DictWriter(
            file,
            fieldnames=["date", "category", "description", "amount"]
        )

        if not file_exists:
            writer.writeheader()

        writer.writerow({
            "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "category": expense_data["category"],
            "description": expense_data["description"],
            "amount": expense_data["amount"]
        })