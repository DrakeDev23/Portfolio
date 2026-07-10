from typing import Optional

from sqlalchemy import String, Text, Integer
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import Mapped, mapped_column

from app.db.database import Base


class Event(Base):
    __tablename__ = "events"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    location: Mapped[str] = mapped_column(String, nullable=False)
    date: Mapped[str] = mapped_column(String, nullable=False)
    role: Mapped[str] = mapped_column(String, nullable=False)
    achievement: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    desc: Mapped[str] = mapped_column(Text, nullable=False)


class Project(Base):
    __tablename__ = "projects"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    title: Mapped[str] = mapped_column(String, nullable=False)
    subtitle: Mapped[str] = mapped_column(String, nullable=False)
    desc: Mapped[str] = mapped_column(Text, nullable=False)
    tags: Mapped[list[str]] = mapped_column(ARRAY(String), nullable=False)
    color: Mapped[str] = mapped_column(String, nullable=False)
    image: Mapped[str] = mapped_column(String, nullable=False)
    likes: Mapped[int] = mapped_column(Integer, nullable=False, default=0, server_default="0")


class Skill(Base):
    __tablename__ = "skills"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    category: Mapped[str] = mapped_column(String, nullable=False)
    name: Mapped[str] = mapped_column(String, nullable=False)