# Tasks: Initial Architecture

**Spec**: `docs/feature/001-initial-architecture/spec.md`
**Plan**: `docs/feature/001-initial-architecture/plan.md`

## Phase 0: Environment Setup

- [ ] **T-001**: Initialize Frontend Project
  - Run `npm create vite@latest client -- --template react-ts`
  - Clean up default boilerplate.
- [ ] **T-002**: Install Frontend Dependencies
  - `npm install phaser zustand axios clsx tailwind-merge`
  - `npm install -D tailwindcss postcss autoprefixer`
  - `npx tailwindcss init -p`
- [ ] **T-003**: Configure Frontend Tooling
  - Configure `vite.config.ts`.
  - Configure `tailwind.config.js`.
- [ ] **T-004**: Initialize Backend Project
  - Create `server/pyproject.toml` or `requirements.txt`.
  - Create virtual environment (optional but recommended).
- [ ] **T-005**: Install Backend Dependencies
  - `pip install fastapi uvicorn[standard] python-dotenv google-generativeai pydantic`

## Phase 1: Core Implementation

### Backend
- [ ] **T-006**: Create Project Structure
  - `server/app/main.py`
  - `server/app/core/`
  - `server/app/api/`
  - `server/app/agents/`
  - `server/data/agents/`
- [ ] **T-007**: Implement Agent Data Model
  - Create Pydantic models for `Soul`, `Memory`, `Values`, `Goal`.
  - Create `Agent` model aggregating these.
- [ ] **T-008**: Implement Markdown Loader
  - Write logic to read `soul.md`, `memory.md`, etc., from `server/data/agents/{agent_id}/`.
  - Parse content into the Pydantic models.
- [ ] **T-009**: Create API Endpoints
  - `GET /health`: Simple check.
  - `GET /agents`: List all agents.
  - `GET /agents/{id}`: Get specific agent details.
- [ ] **T-010**: Create Dummy Data
  - Create `server/data/agents/001/` with sample markdown files.

### Frontend
- [ ] **T-011**: Setup Phaser Integration
  - Create `client/src/game/PhaserGame.tsx` component.
  - Initialize a basic Phaser `Scene`.
- [ ] **T-012**: Setup State Management
  - Create `client/src/stores/useAgentStore.ts`.
  - Implement actions to fetch agents from API.
- [ ] **T-013**: Create Main Layout
  - `client/src/App.tsx` with a Split View (Game Canvas | Control Panel).
- [ ] **T-014**: Connect Frontend to Backend
  - Use `axios` (or fetch) to call `http://localhost:8000/agents`.
  - Render agent names in the Control Panel.

## Phase 2: Verification

- [ ] **T-015**: End-to-End Test
  - Start Server: `uvicorn app.main:app --reload`
  - Start Client: `npm run dev`
  - Verify "Hello World" agent appears in the UI list.
