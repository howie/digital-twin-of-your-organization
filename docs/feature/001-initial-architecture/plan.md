# Implementation Plan: Initial Architecture & Scaffolding

**Branch**: `001-initial-architecture` | **Date**: 2026-02-07 | **Spec**: `docs/feature/001-initial-architecture/spec.md`
**Input**: Feature specification.

## Summary

Initialize the "Digital Twin" project with a Client-Server architecture.
- **Client**: React + Vite + TypeScript + Phaser + Zustand + Tailwind.
- **Server**: FastAPI + Python + Gemini SDK.
- **Data**: Markdown-based Agent definitions.

## Technical Context

**Language/Version**: Python 3.11+ (Backend), Node.js 20+ (Frontend)
**Primary Dependencies**:
- Backend: `fastapi`, `uvicorn`, `google-generativeai`, `python-dotenv`
- Frontend: `react`, `phaser`, `zustand`, `tailwindcss`
**Storage**: File-based (.md) for Agents initially.
**Testing**: `pytest` (Backend), `vitest` (Frontend).
**Target Platform**: Web (Localhost initially).
**Project Type**: Web Application (Monorepo-style: client/server folders).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Library-First**: N/A for scaffolding (app structure).
- **CLI Interface**: N/A for web app scaffolding, but backend will expose API.
- **Test-First**: Basic health checks will be implemented.

## Project Structure

### Documentation (this feature)

```text
docs/feature/001-initial-architecture/
├── plan.md              # This file
├── spec.md              # Feature specification
└── tasks.md             # To be created
```

### Source Code (repository root)

```text
client/                  # Frontend
├── src/
│   ├── components/      # React UI components
│   ├── game/            # Phaser game logic
│   ├── stores/          # Zustand state management
│   ├── services/        # API communication
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
└── vite.config.ts

server/                  # Backend
├── app/
│   ├── agents/          # Agent logic & file readers
│   ├── api/             # FastAPI routes
│   ├── core/            # Config, LLM setup
│   └── main.py
├── data/                # Data storage (agents MD files)
├── requirements.txt
└── pyproject.toml
```

**Structure Decision**: Standard Client/Server separation. Frontend handles all visualization (React + Phaser), Backend handles logic and AI (FastAPI + Gemini).

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Two distinct tech stacks (JS & Python) | AI ecosystem is best in Python; Web Viz is best in JS | Trying to do AI in JS or Web Game in Python (Streamlit/PyGame) delivers poor UX or poor AI capabilities. |
