import json
import os
import smtplib
import urllib.request
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


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


def send_email_smtp(to_email, name, email, message):
    """Отправить email через SMTP Timeweb."""
    smtp_host = "smtp.timeweb.ru"
    smtp_port = 465
    smtp_user = "info@ssb.spb.ru"
    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    if not smtp_password:
        print("[email] SMTP_PASSWORD not set, skipping")
        return

    html = (
        "<html><body style='font-family:Arial,sans-serif;color:#222;max-width:600px;margin:0 auto;'>"
        "<h2 style='color:#1a3a6b;'>Новая заявка — E-Home Systems</h2>"
        "<table style='width:100%;border-collapse:collapse;'>"
        "<tr><td style='padding:8px;font-weight:bold;width:120px;'>Имя:</td><td style='padding:8px;'>" + name + "</td></tr>"
        "<tr style='background:#f5f5f5;'><td style='padding:8px;font-weight:bold;'>Email клиента:</td><td style='padding:8px;'>" + email + "</td></tr>"
        "<tr><td style='padding:8px;font-weight:bold;'>Сообщение:</td><td style='padding:8px;'>" + message + "</td></tr>"
        "</table>"
        "<p style='margin-top:24px;color:#666;font-size:13px;'>Заявка получена с сайта E-Home Systems — e-homesystems.ru</p>"
        "</body></html>"
    )

    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Новая заявка с сайта E-Home Systems от " + name
    msg["From"] = "E-Home Systems <info@ssb.spb.ru>"
    msg["To"] = to_email
    msg.attach(MIMEText(html, "html", "utf-8"))

    with smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=15) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, [to_email], msg.as_string())
    print("[email] sent ok via SMTP to", to_email)


def handler(event: dict, context) -> dict:
    """Принимает заявку с формы сайта E-Home Systems и отправляет уведомления в Telegram и на email."""
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
            "<b>Новая заявка — E-Home Systems</b>\n\n"
            "<b>Имя:</b> " + name + "\n"
            "<b>Email:</b> " + email + "\n"
            "<b>Сообщение:</b>\n" + message
        )
        send_telegram(bot_token, chat_id, tg_text)

    notify_email = os.environ.get("NOTIFY_EMAIL", "info@ssb.spb.ru")
    send_email_smtp(notify_email, name, email, message)

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True}),
    }