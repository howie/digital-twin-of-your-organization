from fastapi import APIRouter, HTTPException

from app.agents.loader import load_agent, load_all_agents
from app.agents.models import Agent
from app.core.config import settings

router = APIRouter()


@router.get("/health")
def health_check() -> dict:
    return {"status": "ok"}


@router.get("/agents", response_model=list[Agent])
def list_agents() -> list[Agent]:
    return load_all_agents(settings.data_dir)


@router.get("/agents/{agent_id}", response_model=Agent)
def get_agent(agent_id: str) -> Agent:
    agent_dir = settings.data_dir / "agents" / agent_id
    if not agent_dir.exists():
        raise HTTPException(status_code=404, detail=f"Agent '{agent_id}' not found")
    return load_agent(agent_dir)
