import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY"),
    http_options={"api_version": "v1"}
)

def convert_to_json(user_text: str):
    print("Calling Gemini...")

    prompt = f"""
You are an expense parser.

Convert the following sentence into STRICT JSON.

Rules:
- Output ONLY valid JSON.
- Do NOT include markdown.
- Do NOT include explanations.
- Do NOT wrap in ```json.
- category must be one of: Food, Entertainment, Fitness, Apparel, Transport, Utilities, Maintenance, Other.
- description must clearly describe the expense.
- amount must be a number (no currency symbols).

Return exactly this format:

{{
  "category": "",
  "description": "",
  "amount": 0
}}

Sentence: "{user_text}"
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    print("Gemini returned:")
    print(response.text)

    return response.text