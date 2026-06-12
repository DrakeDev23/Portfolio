from fastapi import APIRouter
from app.api.routes.projects import router as projects_router
from app.api.routes.events   import router as events_router
from app.api.routes.skills   import router as skills_router
from app.api.routes.contact  import router as contact_router
from app.api.routes.chat import router as chat_router


api_router = APIRouter()
api_router.include_router(projects_router, prefix="/projects")
api_router.include_router(events_router,   prefix="/events")
api_router.include_router(skills_router,   prefix="/skills")
api_router.include_router(contact_router,  prefix="/contact")
api_router.include_router(chat_router, prefix="/chat", tags=["chat"])
