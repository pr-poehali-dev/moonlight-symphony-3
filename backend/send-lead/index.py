import json
import os
import urllib.request


def send_telegram(bot_token, chat_id, text):
    """Отправить сообщение в Telegram через Bot API."""
    url = "https://api.telegram.org/bot" + bot_token + "/sendMessage"
    payload = json.dumps({
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML"
    }).encode("utf-8")
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    urllib.request.urlopen(req, timeout=10)


def send_email_via_api(to_email, name, email, message):
    """Отправить email через poehali SMTP API."""
    import smtplib
    from email.mime.text import MIMEText
    from email.mime.multipart import MIMEMultipart

    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Новая заявка с сайта СтражДом от " + name
    msg["From"] = "noreply@poehali.dev"
    msg["To"] = to_email

    html = (
        "<html><body style='font-family:Arial,sans-serif;color:#222;max-width:600px;margin:0 auto;'>"
        "<h2 style='color:#1a3a6b;'>Новая заявка — СтражДом</h2>"
        "<table style='width:100%;border-collapse:collapse;'>"
        "<tr><td style='padding:8px;font-weight:bold;width:120px;'>Имя:</td><td style='padding:8px;'>" + name + "</td></tr>"
        "<tr style='background:#f5f5f5;'><td style='padding:8px;font-weight:bold;'>Email:</td><td style='padding:8px;'>" + email + "</td></tr>"
        "<tr><td style='padding:8px;font-weight:bold;'>Сообщение:</td><td style='padding:8px;'>" + message + "</td></tr>"
        "</table>"
        "<p style='margin-top:24px;color:#666;font-size:13px;'>Заявка получена с сайта strajdom.ru</p>"
        "</body></html>"
    )
    msg.attach(MIMEText(html, "html"))

    server = smtplib.SMTP("smtp.poehali.dev", 587, timeout=10)
    server.starttls()
    server.login("noreply@poehali.dev", "poehali")
    server.sendmail("noreply@poehali.dev", to_email, msg.as_string())
    server.quit()


def handler(event: dict, context) -> dict:
    """Принимает заявку с формы сайта СтражДом и отправляет уведомления в Telegram и на email."""
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": cors_headers, "body": json.dumps({"error": "Method not allowed"})}

    body = json.loads(event.get("body") or "{}")
    name = str(body.get("name", "")).strip()
    email = str(body.get("email", "")).strip()
    message = str(body.get("message", "")).strip()

    if not name or not email or not message:
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"error": "Все поля обязательны"})}

    bot_token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID", "")
    if bot_token and chat_id:
        tg_text = (
            "<b>Новая заявка — СтражДом</b>\n\n"
            "<b>Имя:</b> " + name + "\n"
            "<b>Email:</b> " + email + "\n"
            "<b>Сообщение:</b>\n" + message
        )
        send_telegram(bot_token, chat_id, tg_text)

    notify_email = os.environ.get("NOTIFY_EMAIL", "")
    if notify_email:
        send_email_via_api(notify_email, name, email, message)

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True}),
    }