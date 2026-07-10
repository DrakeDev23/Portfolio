from typing import Optional
from pydantic import BaseModel


class EventSchema(BaseModel):
    id: str
    name: str
    location: str
    date: str
    role: str
    achievement: Optional[str] = None
    desc: str

    class Config:
        from_attributes = True


class ProjectSchema(BaseModel):
    id: str
    title: str
    subtitle: str
    desc: str
    tags: list[str]
    color: str
    image: str
    likes: int

    class Config:
        from_attributes = True