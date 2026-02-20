# Digital Twin of Your Organization (Role Play with AI)

## Project Overview

This project aims to build a **Digital Twin of Your Organization**—a social experiment and simulation platform. It allows users to simulate various organizational environments (schools, teams, companies, clubs) using AI Agents.

**Core Concept:**
- **Agents:** Autonomous entities with individual personas defined by `soul.md`, `memory.md`, `values.md`, and `goal.md`.
- **Visualization:** A pixel-art style interface (similar to GatherTown or SimCity) where agents move, work, and interact in defined spaces (e.g., offices).
- **Goal:** Provide a safe sandbox for users to practice leadership, coaching, and management skills by role-playing as outsiders (consultants, coaches, managers) and observing agent reactions.

## System Modules

1.  **God Mode (Setup):**
    - Define the Digital Twin parameters: number of agents, scene/map, backstory, and scenarios.
    - Configure individual agent personalities and tasks.

2.  **Auto Simulation:**
    - Autonomous agent behavior: working, conversing, and evolving over time.
    - User ability to assign tasks and observe progress.
    - Visual representation of the ecosystem.

3.  **Role Play (Interaction):**
    - The user enters the simulation as an external character.
    - Real-time interaction (text/voice) with specific agents.
    - Goal: Influence agents and outcome through soft skills.

## Development Workflow (Speckit)

This project utilizes a **Specification-Driven Development** approach using the `speckit` framework found in `.specify/`.

### Key Directories
- **`.specify/`**: Contains core scripts (`scripts/bash/`), templates (`templates/`), and the project constitution (`memory/constitution.md`).
- **`.gemini/commands/`**: Contains TOML configurations for Gemini-driven workflows (planning, analysis, implementation).
- **`.claude/commands/`**: Parallel configurations for Claude-driven workflows.

### Agent Definition Structure
Every agent in the system is defined by four core markdown files:
- `soul.md`: Core personality and essence.
- `memory.md`: Persistent history and experiences.
- `values.md`: Decision-making principles.
- `goal.md`: Objectives and motivations.

### How to Start a New Feature
Use the defined Gemini commands to drive the development process:

1.  **Analyze**: Understand requirements.
    ```bash
    /speckit.analyze "Feature description"
    ```
2.  **Plan**: Generate an implementation plan.
    ```bash
    /speckit.plan "Feature name"
    ```
3.  **Implement**: execute the code generation based on the plan.
    ```bash
    /speckit.implement
    ```

## Tech Stack (Inferred/Proposed)
*Note: Specific implementation details to be decided during the planning phase.*
- **Frontend/Visuals:** Likely web-based (React/Next.js) or Game Engine (Flutter/Unity) for pixel art rendering.
- **Backend/AI:** Logic to drive Agent behaviors, manage state (`.md` files), and handle LLM interactions.

## Current Status

**Feature 001 (Initial Architecture)**: Implementation complete, pending E2E verification.

- Client/Server architecture scaffolded and functional.
- Agent Markdown-based data model implemented (soul, memory, values, goal).
- REST API endpoints operational (`/health`, `/agents`, `/agents/{id}`).
- Phaser game engine integrated with React frontend.
- Zustand state management connected to backend API.
- Sample agent data created (Agent 001: Alice Chen).

**Next**: Feature 002 - Agent Chat & AI Integration.
