import re
import datetime
import httpx
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, EmailStr, Field, ConfigDict, field_validator
from slowapi import Limiter
from slowapi.util import get_remote_address
from app.core.config import settings

router = APIRouter()

# --- Rate limiter -----------------------------------------------------------
# In main.py:
#   from app.routes.contact import limiter
#   app.state.limiter = limiter
#   app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
limiter = Limiter(key_func=get_remote_address)

NAME_MAX    = 80
EMAIL_MAX   = 254
SUBJECT_MAX = 150
MESSAGE_MAX = 2000

_TAG_RE     = re.compile(r"<[^>]*>")
# Control chars EXCEPT \t \n \r (kept so message bodies can have line breaks)
_CTRL_RE    = re.compile(r"[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]")
# Newline/CR/tab — stripped from single-line fields to prevent header/template injection
_LINEBREAK_RE = re.compile(r"[\r\n\t]")


def sanitize_line(value: str, max_len: int) -> str:
    """For single-line fields: name, subject, email. Strips tags, control chars,
    and any newline/CR/tab to prevent header or template injection."""
    value = _TAG_RE.sub("", value)
    value = _CTRL_RE.sub("", value)
    value = _LINEBREAK_RE.sub(" ", value)
    return value.strip()[:max_len]


def sanitize_text(value: str, max_len: int) -> str:
    """For multi-line fields: message. Strips tags and dangerous control chars
    but preserves \\n for paragraph breaks."""
    value = _TAG_RE.sub("", value)
    value = _CTRL_RE.sub("", value)
    # collapse \r\n -> \n, drop stray \r
    value = value.replace("\r\n", "\n").replace("\r", "\n")
    return value.strip()[:max_len]


class ContactRequest(BaseModel):
    # Reject any unexpected fields outright
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    name:    str = Field(min_length=1, max_length=NAME_MAX)
    email:   EmailStr = Field(max_length=EMAIL_MAX)
    subject: str = Field(min_length=1, max_length=SUBJECT_MAX)
    message: str = Field(min_length=1, max_length=MESSAGE_MAX)

    # Honeypot: real users never see/fill this field. Bots that auto-fill
    # every input will populate it, so we use it to silently drop spam.
    website: str = Field(default="", max_length=200)

    @field_validator("name")
    @classmethod
    def validate_name(cls, v):
        v = sanitize_line(v, NAME_MAX)
        if len(v) < 2:
            raise ValueError("Name must be at least 2 characters.")
        return v

    @field_validator("email")
    @classmethod
    def validate_email(cls, v):
        # EmailStr already enforces format; strip any stray whitespace/control chars
        return sanitize_line(str(v), EMAIL_MAX)

    @field_validator("subject")
    @classmethod
    def validate_subject(cls, v):
        v = sanitize_line(v, SUBJECT_MAX)
        if len(v) < 3:
            raise ValueError("Subject must be at least 3 characters.")
        return v

    @field_validator("message")
    @classmethod
    def validate_message(cls, v):
        v = sanitize_text(v, MESSAGE_MAX)
        if len(v) < 10:
            raise ValueError("Message must be at least 10 characters.")
        return v

    @field_validator("website")
    @classmethod
    def validate_honeypot(cls, v):
        # Don't raise here — raise generic validation errors leak info to bots.
        # We check this value in the route handler instead.
        return v


@router.post("")
@limiter.limit("5/minute")
async def send_contact(request: Request, payload: ContactRequest):
    # Honeypot tripped -> silently pretend success, don't actually send anything.
    if payload.website:
        return {"message": "Message sent successfully."}

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
            "time":       datetime.datetime.utcnow().strftime("%B %d, %Y %H:%M UTC"),
        },
    }

    try:
        async with httpx.AsyncClient(timeout=10) as client:
            resp = await client.post(
                "https://api.emailjs.com/api/v1.0/email/send",
                json=emailjs_payload,
            )
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Email service timed out.")
    except httpx.HTTPError:
        raise HTTPException(status_code=502, detail="Failed to reach email service.")

    if resp.status_code != 200:
        # Avoid logging raw upstream response bodies verbatim (could contain
        # reflected user input -> log injection / log forging).
        print(f"EmailJS error: status={resp.status_code}")
        raise HTTPException(status_code=502, detail="Failed to send email.")

    return {"message": "Message sent successfully."}