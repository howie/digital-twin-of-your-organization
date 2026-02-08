# Implementation Plan: Agent Chat & AI Integration

**Branch**: `002-agent-chat` | **Date**: 2026-02-08 | **Spec**: `docs/feature/002-agent-chat/spec.md`
**Input**: Feature specification from `/docs/feature/002-agent-chat/spec.md`

## Summary

Add a chat system that lets users converse with AI agents. The backend integrates Google Gemini to generate character-consistent responses using each agent's personality files (soul, memory, values, goal) as system context. The frontend provides a chat panel with per-agent conversation state.

## Technical Context

**Language/Version**: Python 3.11+ (Backend), Node.js 20+ (Frontend)
**Primary Dependencies**:
- Backend: `google-generativeai` (already installed), `fastapi`, `pydantic`
- Frontend: `react`, `zustand`, `axios` (already installed)
**Storage**: In-memory conversation state (session-scoped); agent definitions from filesystem (.md files)
**Testing**: `pytest` + `httpx` (Backend), manual verification (Frontend)
**Target Platform**: Web (Localhost)
**Project Type**: Web Application (Monorepo: client/server)
**Performance Goals**: Agent response under 10 seconds
**Constraints**: Gemini API token limits; conversation history capped at last 20 messages

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Library-First**: Chat service is a standalone module under `server/app/chat/`.
- **CLI Interface**: Exposed via REST API (`POST /agents/{id}/chat`).
- **Test-First**: API endpoint testable with `httpx`; Gemini calls mockable.

## Project Structure

### Documentation (this feature)

```text
docs/feature/002-agent-chat/
├── spec.md              # Feature specification
├── plan.md              # This file
└── tasks.md             # Task breakdown (to be created)
```

### Source Code (new/modified files)

```text
server/
├── app/
│   ├── chat/                    # NEW: Chat module
│   │   ├── __init__.py
│   │   ├── service.py           # Gemini integration & prompt construction
│   │   └── models.py            # ChatMessage, ChatRequest, ChatResponse
│   └── api/
│       └── routes.py            # MODIFIED: Add POST /agents/{id}/chat

client/
├── src/
│   ├── components/              # NEW: UI components
│   │   └── ChatPanel.tsx        # Chat UI (message list, input, send)
│   ├── stores/
│   │   └── useAgentStore.ts     # MODIFIED: Add selected agent, chat state
│   ├── services/
│   │   └── api.ts               # MODIFIED: Add sendMessage() function
│   └── App.tsx                  # MODIFIED: Integrate ChatPanel
```

**Structure Decision**: Follows existing client/server separation. New `chat/` module on backend keeps AI logic isolated from agent data loading. Frontend adds a `ChatPanel` component and extends existing stores/services.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Gemini SDK dependency | AI-driven responses are the core feature | Hard-coded responses provide no simulation value |

## Implementation Phases

### Phase 0: Backend Chat Foundation

1. Create `server/app/chat/models.py` with Pydantic models (ChatMessage, ChatRequest, ChatResponse).
2. Create `server/app/chat/service.py` with Gemini integration:
   - Build system prompt from agent personality files.
   - Convert conversation history to Gemini message format.
   - Call Gemini API and return response.
3. Add `POST /agents/{id}/chat` endpoint to `routes.py`.
4. Handle errors: missing API key, Gemini API failures, invalid agent ID.

### Phase 1: Frontend Chat UI

1. Create `ChatPanel.tsx` component with message list and input form.
2. Extend `useAgentStore.ts`: add `selectedAgent`, per-agent `chatHistory`, `sendMessage` action.
3. Add `sendMessage()` to `api.ts`.
4. Integrate `ChatPanel` into `App.tsx` layout (replaces or sits below agent list in right panel).

### Phase 2: Polish & Verification

1. Auto-scroll chat to latest message.
2. Loading indicator while waiting for AI response.
3. End-to-end verification: select agent, send message, receive response.
