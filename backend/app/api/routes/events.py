from fastapi import APIRouter
from app.data.events import EVENTS

router = APIRouter()

@router.get("")
def get_events():
    return EVENTS
