# Tasks: Agent Chat & AI Integration

**Spec**: `docs/feature/002-agent-chat/spec.md`
**Plan**: `docs/feature/002-agent-chat/plan.md`

## Phase 0: Backend Chat Foundation

- [x] **T-001**: Create Chat Data Models
  - Create `server/app/chat/__init__.py`
  - Create `server/app/chat/models.py` with Pydantic models:
    - `ChatMessage` (role: "user" | "agent", content: str)
    - `ChatRequest` (message: str, history: list[ChatMessage])
    - `ChatResponse` (message: str)

- [x] **T-002**: Implement Gemini Chat Service
  - Create `server/app/chat/service.py`
  - Build system prompt from agent's soul, memory, values, goal files.
  - Convert conversation history to Gemini-compatible format.
  - Call Gemini `send_message_async` API and extract response text.
  - Handle API errors (missing key, rate limit, network failure).

- [x] **T-003**: Add Chat API Endpoint
  - Add `POST /agents/{agent_id}/chat` to `server/app/api/routes.py`.
  - Validate agent exists (404 if not found).
  - Call chat service with agent data + user message + history.
  - Return `ChatResponse` with agent's reply.

- [x] **T-004**: Error Handling & Configuration
  - Verify Gemini API key is loaded from `.env`.
  - Return 503 if Gemini API is unavailable.
  - Return 400 if message is empty.
  - Cap conversation history to last 20 messages before sending to Gemini.

## Phase 1: Frontend Chat UI

- [x] **T-005**: Create ChatPanel Component
  - Create `client/src/components/ChatPanel.tsx`.
  - Message list area (scrollable) displaying user and agent messages with visual distinction.
  - Text input field with Send button.
  - Empty state when no messages yet.

- [x] **T-006**: Extend State Management
  - Update `client/src/stores/useAgentStore.ts`:
    - Add `selectedAgentId: string | null` and `selectAgent(id)` action.
    - Add `chatHistories: Record<string, ChatMessage[]>` for per-agent conversations.
    - Add `sendChatMessage(agentId, message)` async action.
    - Add `sending: boolean` loading state for chat.

- [x] **T-007**: Add Chat API Client Function
  - Add `sendMessage(agentId, message, history)` to `client/src/services/api.ts`.
  - Define `ChatMessage`, `ChatResponse` TypeScript interfaces.
  - POST to `/api/agents/{id}/chat`.

- [x] **T-008**: Integrate ChatPanel into App Layout
  - Modify `client/src/App.tsx`:
    - Agent list items become clickable (select agent).
    - Show `ChatPanel` below agent list when an agent is selected.
    - Highlight selected agent in the list.

## Phase 2: Polish & Verification

- [x] **T-009**: UX Enhancements
  - Auto-scroll chat to bottom on new messages.
  - Show "Thinking..." indicator while waiting for agent response.
  - Disable send button while a response is pending.
  - Support Enter key to send message.

- [ ] **T-010**: End-to-End Verification
  - Start backend with valid Gemini API key.
  - Start frontend dev server.
  - Select Agent 001 (Alice Chen), send a message, verify character-consistent response.
  - Send follow-up message, verify multi-turn context is maintained.
  - Switch to another agent (if available), verify independent conversation history.
