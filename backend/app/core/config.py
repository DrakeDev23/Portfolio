from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    EMAILJS_SERVICE_ID:  str
    EMAILJS_TEMPLATE_ID: str
    EMAILJS_PUBLIC_KEY:  str
    EMAILJS_PRIVATE_KEY: str
    GROQ_API_KEY: str
    GROQ_MODEL: str = "llama-3.3-70b-versatile"

    class Config:
        env_file = ".env"


settings = Settings()