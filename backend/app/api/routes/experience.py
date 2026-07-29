from fastapi import APIRouter

router = APIRouter()

EXPERIENCE = [
    {
        "id": "fullstack",
        "title": "Full-Stack Development",
        "organization": "Personal & Academic Projects",
        "level": 75,
    },
    {
        "id": "pentest",
        "title": "Penetration Testing",
        "organization": "CTF & Security Labs",
        "level": 65,
    },
    {
        "id": "backend",
        "title": "Backend Development",
        "organization": "FastAPI & PostgreSQL",
        "level": 70,
    },
    {
        "id": "frontend",
        "title": "Frontend Development",
        "organization": "React & Modern UI",
        "level": 80,
    },
]


@router.get("")
def get_experience():
    return EXPERIENCE
