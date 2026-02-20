import logging

from fastapi import APIRouter, HTTPException

from app.agents.loader import load_agent, load_all_agents
from app.agents.models import Agent
from app.chat.models import ChatRequest, ChatResponse
from app.chat.service import chat_with_agent
from app.core.config import settings

logger = logging.getLogger(__name__)

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


@router.post("/agents/{agent_id}/chat", response_model=ChatResponse)
async def agent_chat(agent_id: str, request: ChatRequest) -> ChatResponse:
    # Validate message is not empty
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    # Validate agent exists
    agent_dir = settings.data_dir / "agents" / agent_id
    if not agent_dir.exists():
        raise HTTPException(status_code=404, detail=f"Agent '{agent_id}' not found")

    agent = load_agent(agent_dir)

    try:
        reply = await chat_with_agent(agent, request.message, request.history)
    except ValueError as e:
        # Missing API key
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        logger.exception("Gemini API error for agent '%s'", agent_id)
        raise HTTPException(
            status_code=502,
            detail="Failed to get response from AI service. Please try again.",
        )

    return ChatResponse(message=reply)
