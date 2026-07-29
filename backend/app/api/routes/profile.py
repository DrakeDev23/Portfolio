from fastapi import APIRouter

router = APIRouter()

PROFILE = {
    "name": "Drake",
    "hostname": "DRAKE@ARCH",
    "title": "Cybersecurity Student & Full-Stack Developer",
    "location": "Cebu, Philippines",
    "education": "Bachelor of Science in Information Technology",
    "roles": [
        "aspiring Cybersecurity professional",
        "Programmer",
        "CTF Player",
        "Full-Stack Developer",
        "Co-Founder",
    ],
    "bio": (
        "BSIT student building secure, performant software. I bridge clean frontend "
        "experiences with hardened backend systems and break things professionally in CTFs."
    ),
}


@router.get("")
def get_profile():
    return PROFILE
