import os
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, ContextTypes, filters
from telegram_bot.services.csv_services import get_user_summary
from telegram_bot.services.csv_services import save_expense, init_google_sheet
from telegram_bot.services.gemini_service import convert_to_json
from telegram_bot.services.voice_service import transcribe_audio


load_dotenv()
TOKEN = os.getenv("BOT_TOKEN")


# -------- START --------
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Bot is alive.")


# -------- PROFILE --------
async def profile(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.message.from_user

    await update.message.reply_text(
        f"ID: {user.id}\n"
        f"Name: {user.first_name}"
    )


# -------- HANDLE TEXT --------
async def handle_text(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_text = update.message.text.lower()
    user_id = update.message.from_user.id

    # ---- SUMMARY KEYWORDS ----
    summary_keywords = [
        "summary",
        "report",
        "my expenses",
        "show expenses",
        "show summary",
        "how much did i spend",
        "total spent"
    ]

    if any(keyword in user_text for keyword in summary_keywords):
        data = get_user_summary(user_id)

        if not data:
            await update.message.reply_text("No expenses found.")
            return

        message = "📊 Your Expense Summary:\n\n"

        total = 0
        for category, amount in data.items():
            message += f"{category}: ₹{amount}\n"
            total += amount

        message += f"\nTotal Spent: ₹{total}"

        await update.message.reply_text(message)
        return

    # ---- NORMAL EXPENSE FLOW ----
    expenses = convert_to_json(user_text)

    if not expenses:
        await update.message.reply_text("Could not detect any expense.")
        return

    for expense in expenses:
        save_expense(expense, user_id)

    await update.message.reply_text("Expense saved.") 

async def handle_voice(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.message.from_user.id
    voice = update.message.voice

    # Download file
    file = await context.bot.get_file(voice.file_id)
    file_path = "voice.ogg"
    await file.download_to_drive(file_path)

    # Convert to wav using ffmpeg
    import os
    os.system(f"ffmpeg -i {file_path} voice.wav -y")

    # Transcribe
    text = transcribe_audio("voice.wav")
    print("Transcribed:", text)

    # Use existing expense logic
    expenses = convert_to_json(text)

    if not expenses:
        await update.message.reply_text("Could not detect any expense from voice.")
        return

    for expense in expenses:
        save_expense(expense, user_id)

    await update.message.reply_text(f"Saved from voice:\n{text}")



# -------- SUMMARY --------
async def summary(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.message.from_user.id

    data = get_user_summary(user_id)

    if not data:
        await update.message.reply_text("No expenses found.")
        return

    message = "📊 Your Expense Summary:\n\n"

    total = 0
    for category, amount in data.items():
        message += f"{category}: ₹{amount}\n"
        total += amount

    message += f"\nTotal Spent: ₹{total}"

    await update.message.reply_text(message)

# -------- MAIN --------
def main():
    init_google_sheet()

    app = ApplicationBuilder().token(TOKEN).build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("profile", profile))
    app.add_handler(CommandHandler("summary", summary))
    app.add_handler(MessageHandler(filters.VOICE, handle_voice))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_text))

    print("Bot running...")
    app.run_polling()


if __name__ == "__main__":
    main()