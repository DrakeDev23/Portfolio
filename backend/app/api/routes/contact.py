import re
import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr, field_validator
from app.core.config import settings

router = APIRouter()

NAME_MAX    = 80
SUBJECT_MAX = 150
MESSAGE_MAX = 2000

def sanitize(value: str, max_len: int) -> str:
    value = re.sub(r"<[^>]*>", "", value)          
    value = re.sub(r"[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]", "", value)  
    return value.strip()[:max_len]

class ContactRequest(BaseModel):
    name:    str
    email:   EmailStr
    subject: str
    message: str

    @field_validator("name")
    @classmethod
    def validate_name(cls, v):
        v = sanitize(v, NAME_MAX)
        if len(v) < 2:
            raise ValueError("Name must be at least 2 characters.")
        return v

    @field_validator("subject")
    @classmethod
    def validate_subject(cls, v):
        v = sanitize(v, SUBJECT_MAX)
        if len(v) < 3:
            raise ValueError("Subject must be at least 3 characters.")
        return v

    @field_validator("message")
    @classmethod
    def validate_message(cls, v):
        v = sanitize(v, MESSAGE_MAX)
        if len(v) < 10:
            raise ValueError("Message must be at least 10 characters.")
        return v

@router.post("")
async def send_contact(payload: ContactRequest):
    emailjs_payload = {
        "service_id":  settings.EMAILJS_SERVICE_ID,
        "template_id": settings.EMAILJS_TEMPLATE_ID,
        "user_id":     settings.EMAILJS_PUBLIC_KEY,
        "accessToken": settings.EMAILJS_PRIVATE_KEY,
        "template_params": {
            "name":       payload.name,
            "email":      payload.email,
            "subject":    payload.subject,
            "message":    payload.message,
            "reply_to":   payload.email,
            "time":       __import__("datetime").datetime.utcnow().strftime("%B %d, %Y %H:%M UTC"),
        },
    }

    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.post(
            "https://api.emailjs.com/api/v1.0/email/send",
            json=emailjs_payload,
        )

    if resp.status_code != 200:
        print(f"EmailJS error: {resp.status_code} — {resp.text}") 
        raise HTTPException(status_code=502, detail="Failed to send email.")

    return {"message": "Message sent successfully."}