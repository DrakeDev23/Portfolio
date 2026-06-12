from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    EMAILJS_SERVICE_ID:  str
    EMAILJS_TEMPLATE_ID: str
    EMAILJS_PUBLIC_KEY:  str
    EMAILJS_PRIVATE_KEY: str
    GEMINI_API_KEY: str
    GEMINI_MODEL: str = "gemini-2.0-flash"
    
    class Config:
        env_file = ".env"

settings = Settings()