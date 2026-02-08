import re
from pathlib import Path

from app.agents.models import Agent, Goal, Memory, Soul, Values


def _extract_name(content: str, fallback: str) -> str:
    """Extract agent name from the first H1 heading in soul.md."""
    match = re.search(r"^#\s+(.+)$", content, re.MULTILINE)
    return match.group(1).strip() if match else fallback


def _read_md(path: Path) -> str:
    """Read a markdown file, returning empty string if it doesn't exist."""
    if path.exists():
        return path.read_text(encoding="utf-8")
    return ""


def load_agent(agent_dir: Path) -> Agent:
    """Load an Agent from a directory containing soul.md, memory.md, values.md, goal.md.

    Missing files are gracefully handled by defaulting to empty strings.
    """
    agent_id = agent_dir.name

    soul_text = _read_md(agent_dir / "soul.md")
    memory_text = _read_md(agent_dir / "memory.md")
    values_text = _read_md(agent_dir / "values.md")
    goal_text = _read_md(agent_dir / "goal.md")

    name = _extract_name(soul_text, fallback=f"Agent {agent_id}")

    return Agent(
        id=agent_id,
        name=name,
        soul=Soul(content=soul_text),
        memory=Memory(content=memory_text),
        values=Values(content=values_text),
        goal=Goal(content=goal_text),
    )


def load_all_agents(data_dir: Path) -> list[Agent]:
    """Load all agents from the data/agents/ directory."""
    agents_dir = data_dir / "agents"
    if not agents_dir.exists():
        return []

    agents = []
    for agent_dir in sorted(agents_dir.iterdir()):
        if agent_dir.is_dir():
            agents.append(load_agent(agent_dir))
    return agents
