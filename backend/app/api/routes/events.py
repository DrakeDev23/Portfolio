from typing import List, Any
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.db import crud
from app.db.schemas import EventSchema

router = APIRouter()


@router.get("", response_model=List[EventSchema])
async def get_events(db: AsyncSession = Depends(get_db)) -> Any:
    return await crud.get_events(db)