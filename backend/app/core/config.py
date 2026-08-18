from pydantic import field_validator
from pydantic_settings import BaseSettings

# Groq shut these down on 2026-08-16. Local .env already uses the replacement;
# production often still has the old default/env value, which 404s at Groq.
_DECOMMISSIONED_GROQ_MODELS = {
    "llama-3.3-70b-versatile": "openai/gpt-oss-20b",
    "llama-3.1-8b-instant": "openai/gpt-oss-20b",
}


class Settings(BaseSettings):
    EMAILJS_SERVICE_ID:  str
    EMAILJS_TEMPLATE_ID: str
    EMAILJS_PUBLIC_KEY:  str
    EMAILJS_PRIVATE_KEY: str
    GROQ_API_KEY: str
    GROQ_MODEL: str = "openai/gpt-oss-20b"
    DATABASE_URL: str

    @field_validator("GROQ_MODEL")
    @classmethod
    def migrate_decommissioned_groq_model(cls, value: str) -> str:
        replacement = _DECOMMISSIONED_GROQ_MODELS.get(value, value)
        if replacement != value:
            print(
                f"GROQ_MODEL {value!r} was decommissioned; using {replacement!r} instead",
                flush=True,
            )
        return replacement

    class Config:
        env_file = ".env"


settings = Settings()