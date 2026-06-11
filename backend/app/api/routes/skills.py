from fastapi import APIRouter
from app.data.skills import SKILLS

router = APIRouter()

@router.get("")
def get_skills():
    return SKILLS
