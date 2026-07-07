from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.db import crud

router = APIRouter()


@router.get("")
async def get_skills(db: AsyncSession = Depends(get_db)):
    return await crud.get_skills(db)