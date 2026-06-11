from fastapi import APIRouter
from app.data.projects import PROJECTS

router = APIRouter()

@router.get("")
def get_projects():
    return PROJECTS