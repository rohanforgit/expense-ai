import re

# -------------------------------
# CATEGORY KEYWORD SYSTEM
# -------------------------------

CATEGORY_KEYWORDS = {
    "Food & Dining": [
        "lunch", "dinner", "breakfast", "snacks", "tea", "coffee", "chai",
        "restaurant", "cafe", "hotel", "burger", "pizza", "roll", "biryani",
        "canteen", "mess", "kfc", "mcd", "dominos", "subway",
        "swiggy", "zomato"
    ],

    "Groceries": [
        "grocery", "milk", "bread", "vegetables", "fruits", "rice", "dal",
        "eggs", "chicken", "fish", "meat", "atta", "oil",
        "bigbasket", "zepto", "blinkit", "supermarket", "dmart"
    ],

    "Transport": [
        "uber", "ola", "rapido", "auto", "metro", "bus", "train",
        "petrol", "diesel", "fuel", "parking", "cab", "ride"
    ],

    "Shopping": [
        "shirt", "tshirt", "jeans", "shoes", "sneakers",
        "zara", "nike", "adidas", "amazon", "flipkart",
        "shopping", "order", "purchase"
    ],

    "Gadgets & Accessories": [
        "iphone", "macbook", "laptop", "mouse", "keyboard",
        "charger", "cable", "headphones", "earbuds",
        "watch", "apple watch", "tablet", "electronics",
        "croma", "vijay sales"
    ],

    "Entertainment": [
        "movie", "bookmyshow", "netflix", "spotify",
        "concert", "party", "club", "game", "ticket", "event"
    ],

    "Health & Fitness": [
        "doctor", "clinic", "hospital", "medicine", "pharmacy",
        "gym", "protein", "supplement", "vitamin", "health"
    ],

    "Personal Care": [
        "salon", "haircut", "spa", "skincare", "cream",
        "cosmetics", "grooming", "razor", "shampoo"
    ],

    "Subscriptions": [
        "subscription", "renewal", "premium",
        "cloud", "hosting", "membership"
    ],

    "Travel & Trips": [
        "flight", "hotel", "resort", "trip", "travel",
        "airbnb", "booking", "train ticket"
    ],

    "Social / Gifts": [
        "gift", "birthday", "treat", "friends",
        "split", "donation", "wedding"
    ]
}


# -------------------------------
# CATEGORY DETECTION
# -------------------------------

def detect_category(description):
    description = description.lower()

    for category, keywords in CATEGORY_KEYWORDS.items():
        for word in keywords:
            if word in description:
                return category

    return "Miscellaneous"


# -------------------------------
# EXPENSE PARSER
# -------------------------------

def convert_to_json(user_text):
    text = user_text.lower()

    # Remove commas inside numbers (1,50,000 → 150000)
    text = re.sub(r'(?<=\d),(?=\d)', '', text)

    # Now split by comma safely
    parts = text.split(",")

    expenses = []

    for part in parts:
        part = part.strip()

        amount_match = re.search(r"\d+", part)
        if not amount_match:
            continue

        amount = int(amount_match.group())

        description = part.replace(amount_match.group(), "").strip()

        fillers = ["for", "to", "paid", "spent", "on", "rs", "rupees"]
        for filler in fillers:
            description = description.replace(filler, "")

        description = description.strip()

        if not description:
            description = "Unknown"

        expenses.append({
            "amount": amount,
            "description": description,
            "category": detect_category(description)
        })

    return expenses

    for part in parts:
        part = part.strip()

        amount_match = re.search(r"\d{1,3}(?:,\d{3})*|\d+", part)
        if not amount_match:
            continue

        amount_str = amount_match.group().replace(",", "")
        amount = int(amount_str)

        description = part.replace(amount_match.group(), "").strip()

        fillers = ["for", "to", "paid", "spent", "on", "rs", "rupees"]
        for filler in fillers:
            description = description.replace(filler, "")

        description = description.strip()

        if not description:
            description = "Unknown"

        expenses.append({
            "amount": amount,
            "description": description,
            "category": detect_category(description)
        })

    return expenses