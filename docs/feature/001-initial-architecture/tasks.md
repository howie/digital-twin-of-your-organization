# Tasks: Initial Architecture

**Spec**: `docs/feature/001-initial-architecture/spec.md`
**Plan**: `docs/feature/001-initial-architecture/plan.md`

## Phase 0: Environment Setup

- [x] **T-001**: Initialize Frontend Project
  - Run `npm create vite@latest client -- --template react-ts`
  - Clean up default boilerplate.
- [x] **T-002**: Install Frontend Dependencies
  - `npm install phaser zustand axios clsx tailwind-merge`
  - `npm install -D tailwindcss postcss autoprefixer`
  - `npx tailwindcss init -p`
- [x] **T-003**: Configure Frontend Tooling
  - Configure `vite.config.ts`.
  - Configure `tailwind.config.js`.
- [x] **T-004**: Initialize Backend Project
  - Create `server/pyproject.toml` or `requirements.txt`.
  - Create virtual environment (optional but recommended).
- [x] **T-005**: Install Backend Dependencies
  - `pip install fastapi uvicorn[standard] python-dotenv google-generativeai pydantic`

## Phase 1: Core Implementation

### Backend
- [x] **T-006**: Create Project Structure
  - `server/app/main.py`
  - `server/app/core/`
  - `server/app/api/`
  - `server/app/agents/`
  - `server/data/agents/`
- [x] **T-007**: Implement Agent Data Model
  - Create Pydantic models for `Soul`, `Memory`, `Values`, `Goal`.
  - Create `Agent` model aggregating these.
- [x] **T-008**: Implement Markdown Loader
  - Write logic to read `soul.md`, `memory.md`, etc., from `server/data/agents/{agent_id}/`.
  - Parse content into the Pydantic models.
- [x] **T-009**: Create API Endpoints
  - `GET /health`: Simple check.
  - `GET /agents`: List all agents.
  - `GET /agents/{id}`: Get specific agent details.
- [x] **T-010**: Create Dummy Data
  - Create `server/data/agents/001/` with sample markdown files.

### Frontend
- [x] **T-011**: Setup Phaser Integration
  - Create `client/src/game/PhaserGame.tsx` component.
  - Initialize a basic Phaser `Scene`.
- [x] **T-012**: Setup State Management
  - Create `client/src/stores/useAgentStore.ts`.
  - Implement actions to fetch agents from API.
- [x] **T-013**: Create Main Layout
  - `client/src/App.tsx` with a Split View (Game Canvas | Control Panel).
- [x] **T-014**: Connect Frontend to Backend
  - Use `axios` (or fetch) to call `http://localhost:8000/agents`.
  - Render agent names in the Control Panel.

## Phase 2: Verification

- [ ] **T-015**: End-to-End Test
  - Start Server: `uvicorn app.main:app --reload`
  - Start Client: `npm run dev`
  - Verify "Hello World" agent appears in the UI list.
