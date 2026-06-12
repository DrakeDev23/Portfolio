from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    EMAILJS_SERVICE_ID:  str
    EMAILJS_TEMPLATE_ID: str
    EMAILJS_PUBLIC_KEY:  str
    EMAILJS_PRIVATE_KEY: str
    
    class Config:
        env_file = ".env"

settings = Settings()