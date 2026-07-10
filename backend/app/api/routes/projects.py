from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.db import crud
from app.db.schemas import ProjectSchema

router = APIRouter()


@router.get("", response_model=list[ProjectSchema])
async def get_projects(db: AsyncSession = Depends(get_db)):
    return await crud.get_projects(db)


@router.patch("/{project_id}/like", response_model=ProjectSchema)
async def like_project(project_id: str, db: AsyncSession = Depends(get_db)):
    project = await crud.like_project(db, project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project