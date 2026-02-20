from google import generativeai as genai

from app.agents.models import Agent
from app.chat.models import ChatMessage
from app.core.config import settings

# Maximum number of history messages to send to Gemini
MAX_HISTORY_MESSAGES = 20


def _build_system_prompt(agent: Agent) -> str:
    """Build a system prompt from the agent's personality files."""
    parts = [
        f"You are role-playing as {agent.name}. Stay in character at all times.",
        "Respond naturally as this person would, based on the following profile:\n",
    ]

    if agent.soul.content.strip():
        parts.append(f"## Personality & Background\n{agent.soul.content.strip()}\n")

    if agent.memory.content.strip():
        parts.append(f"## Memory & Experiences\n{agent.memory.content.strip()}\n")

    if agent.values.content.strip():
        parts.append(f"## Values & Principles\n{agent.values.content.strip()}\n")

    if agent.goal.content.strip():
        parts.append(f"## Current Goals\n{agent.goal.content.strip()}\n")

    parts.append(
        "Important: Respond in the same language the user uses. "
        "Keep responses concise and conversational. "
        "Never break character or mention that you are an AI."
    )

    return "\n".join(parts)


def _build_gemini_history(history: list[ChatMessage]) -> list[dict]:
    """Convert chat history to Gemini's expected format."""
    trimmed = history[-MAX_HISTORY_MESSAGES:]
    gemini_history = []
    for msg in trimmed:
        role = "user" if msg.role == "user" else "model"
        gemini_history.append({"role": role, "parts": [msg.content]})
    return gemini_history


async def chat_with_agent(
    agent: Agent,
    message: str,
    history: list[ChatMessage],
) -> str:
    """Send a message to an agent and get a Gemini-generated response.

    Raises:
        ValueError: If the Gemini API key is not configured.
        RuntimeError: If the Gemini API call fails.
    """
    if not settings.gemini_api_key:
        raise ValueError("Gemini API key is not configured")

    genai.configure(api_key=settings.gemini_api_key)

    model = genai.GenerativeModel(
        model_name="gemini-2.0-flash",
        system_instruction=_build_system_prompt(agent),
    )

    gemini_history = _build_gemini_history(history)
    chat = model.start_chat(history=gemini_history)

    response = await chat.send_message_async(message)
    return response.text
