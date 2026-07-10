from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import models


async def get_events(db: AsyncSession):
    result = await db.execute(select(models.Event))
    return result.scalars().all()


async def get_projects(db: AsyncSession):
    result = await db.execute(select(models.Project))
    return result.scalars().all()


async def like_project(db: AsyncSession, project_id: str):
    result = await db.execute(select(models.Project).where(models.Project.id == project_id))
    project = result.scalar_one_or_none()
    if project is None:
        return None
    project.likes += 1
    await db.commit()
    await db.refresh(project)
    return project


async def get_skills(db: AsyncSession):
    result = await db.execute(select(models.Skill))
    skills = result.scalars().all()
    grouped: dict[str, list[str]] = {}
    for s in skills:
        grouped.setdefault(s.category, []).append(s.name)
    return grouped