from fastapi import APIRouter

router = APIRouter()

CERTIFICATIONS = [
    {
        "id": "bsit",
        "name": "BSIT — Information Technology",
        "issuer": "Currently Enrolled",
        "status": "in_progress",
    },
    {
        "id": "ctf",
        "name": "CTF Competitions",
        "issuer": "Various Events",
        "status": "active",
    },
    {
        "id": "security-labs",
        "name": "Network Security & Pentest Labs",
        "issuer": "Academic & Self-Directed",
        "status": "active",
    },
]


@router.get("")
def get_certifications():
    return CERTIFICATIONS
