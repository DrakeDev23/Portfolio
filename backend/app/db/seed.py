import asyncio

from app.db.database import engine, Base, AsyncSessionLocal
from app.db import models
from app.data.events import EVENTS
from app.data.projects import PROJECTS
from app.data.skills import SKILLS


async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as db:
        for e in EVENTS:
            db.add(models.Event(**e))
        for p in PROJECTS:
            db.add(models.Project(**p))
        for category, names in SKILLS.items():
            for name in names:
                db.add(models.Skill(category=category, name=name))
        await db.commit()

    print("Seed complete")


if __name__ == "__main__":
    asyncio.run(seed())