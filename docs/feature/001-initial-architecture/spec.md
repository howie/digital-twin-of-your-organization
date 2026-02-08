# Feature Specification: Initial Architecture & Scaffolding

**Feature Branch**: `001-initial-architecture`
**Created**: 2026-02-07
**Status**: Approved
**Input**: User request for "Digital Twin of Organization" with specific tech stack (React, Phaser, FastAPI, Gemini).

## User Scenarios & Testing

### User Story 1 - Project Scaffolding (Priority: P1)

As a developer, I want the project directory structure and basic configuration files initialized so that I can start building the frontend and backend.

**Why this priority**: Foundation for all subsequent work.

**Independent Test**:
- `client/` directory exists with a basic React/Vite app running.
- `server/` directory exists with a basic FastAPI app running.
- Frontend can communicate with Backend (simple health check).

**Acceptance Scenarios**:
1. **Given** a fresh clone, **When** I run `npm install` and `npm run dev` in `client`, **Then** the React app loads in the browser.
2. **Given** a fresh clone, **When** I run `pip install` and `uvicorn` in `server`, **Then** the FastAPI swagger docs load.

---

### User Story 2 - Agent Definition (Priority: P2)

As a "God Mode" user, I want to define agents using Markdown files so that their personalities and histories are persistent and editable.

**Why this priority**: Core data structure for the AI agents.

**Independent Test**:
- Create a set of `.md` files (`soul.md`, `memory.md`, etc.).
- Backend script can read these files and parse them into a Python object.

**Acceptance Scenarios**:
1. **Given** a valid `soul.md`, **When** the backend parses it, **Then** an Agent object is created with correct `soul` attribute.
2. **Given** a complete agent directory containing `soul.md`, `memory.md`, `values.md`, `goal.md`, **When** the backend loads the agent, **Then** all four attributes are populated correctly.
3. **Given** an agent directory with a missing file (e.g., no `goal.md`), **When** the backend loads the agent, **Then** the missing field defaults to an empty string and does not raise an error.

---

### User Story 3 - Basic Visualization (Priority: P3)

As a user, I want to see a basic pixel-art map with at least one character so that I can verify the Phaser engine integration.

**Why this priority**: Visual feedback loop for the simulation.

**Independent Test**:
- Open the web application.
- See a tilemap and a sprite.

**Acceptance Scenarios**:
1. **Given** the web app is running, **When** I load the page, **Then** I see a Phaser canvas element (`<canvas>`) rendered within the React UI.
2. **Given** the Phaser canvas is loaded, **When** the scene initializes, **Then** at least one sprite (character) is visible on a tilemap or solid-color background.

## Requirements

### Functional Requirements

- **FR-001**: System MUST have a `client` directory initialized with Vite, React, TypeScript, and Phaser.
- **FR-002**: System MUST have a `server` directory initialized with FastAPI and Python 3.11+.
- **FR-003**: System MUST define a standard file structure for Agents (`soul.md`, `memory.md`, `values.md`, `goal.md`).
- **FR-004**: Backend MUST provide API endpoints: `GET /health` (health check), `GET /agents` (list agents), `GET /agents/{id}` (get agent detail). Responses MUST be JSON.
- **FR-005**: Frontend MUST embed a Phaser game instance within a React component.
- **FR-006**: Backend MUST configure CORS to allow requests from the frontend dev server (`http://localhost:5173`).

### Key Entities

- **Agent**: Represents a simulation entity.
    - `soul`: Personality trait.
    - `memory`: Past experiences.
    - `values`: Decision guidelines.
    - `goal`: Current objectives.
- **World**: The environment where agents exist.

### Non-Functional Requirements

- **NFR-001**: Frontend dev server runs on port `5173` (Vite default); Backend runs on port `8000` (Uvicorn default).
- **NFR-002**: Backend MUST handle missing agent files gracefully (no 500 errors).
- **NFR-003**: Project MUST include a root-level `README.md` with setup instructions for both client and server.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Both Frontend (`npm run dev`) and Backend (`uvicorn app.main:app`) servers start without errors.
- **SC-002**: Frontend can call `GET /health` on Backend and receive a `200 OK` JSON response (cross-origin verified).
- **SC-003**: A dummy Agent (with `soul.md`, `memory.md`, `values.md`, `goal.md`) can be loaded via `GET /agents/{id}` and returns valid JSON.
- **SC-004**: Phaser canvas is rendered within the React app and at least one sprite is visible on screen.
- **SC-005**: `GET /agents` returns a list containing at least one agent.
