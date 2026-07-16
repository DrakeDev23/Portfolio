from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.db import crud
from app.db.schemas import ProjectSchema
from app.core.limiter import limiter

router = APIRouter()


@router.get("", response_model=list[ProjectSchema])
async def get_projects(db: AsyncSession = Depends(get_db)):
    return await crud.get_projects(db)


@router.patch("/{project_id}/like", response_model=ProjectSchema)
@limiter.limit("10/minute")
async def like_project(request: Request, project_id: str, db: AsyncSession = Depends(get_db)):
    project = await crud.like_project(db, project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project