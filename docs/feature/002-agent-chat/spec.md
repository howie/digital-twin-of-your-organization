# Feature Specification: Agent Chat & AI Integration

**Feature Branch**: `002-agent-chat`
**Created**: 2026-02-08
**Status**: Draft
**Input**: Enable users to chat with AI agents whose responses are driven by Gemini, using agent personality files (soul, memory, values, goal) as context.

## User Scenarios & Testing

### User Story 1 - Chat with an Agent (Priority: P1)

As a user, I want to select an agent and send text messages so that the agent responds in character based on its personality files.

**Why this priority**: Core interaction loop — without chat, the simulation has no interactivity.

**Independent Test**:
- Select Agent 001 (Alice Chen) in the Control Panel.
- Type a message and send.
- Receive an AI-generated response consistent with Alice's personality.

**Acceptance Scenarios**:

1. **Given** the app is running and agents are loaded, **When** I click on an agent in the Control Panel, **Then** a chat panel opens for that agent.
2. **Given** a chat panel is open, **When** I type a message and press Send, **Then** the message appears in the chat history as a user message.
3. **Given** a message has been sent, **When** the backend processes it, **Then** an AI-generated response appears in the chat history within 10 seconds.
4. **Given** the agent is Alice Chen (senior engineer), **When** I ask a technical question, **Then** the response reflects her analytical, detail-oriented personality.

---

### User Story 2 - Conversation History (Priority: P2)

As a user, I want the conversation history to persist during a session so that I can have a continuous multi-turn conversation with an agent.

**Why this priority**: Multi-turn context is essential for meaningful roleplay interactions.

**Independent Test**:
- Send multiple messages to an agent.
- Verify earlier messages remain visible and the agent references prior context.

**Acceptance Scenarios**:

1. **Given** I have sent 3 messages to an agent, **When** I view the chat panel, **Then** all 3 user messages and 3 agent responses are visible in chronological order.
2. **Given** an ongoing conversation, **When** I send a follow-up question referencing something the agent said, **Then** the agent's response demonstrates awareness of the prior conversation.

---

### User Story 3 - Agent Selection & Switching (Priority: P3)

As a user, I want to switch between different agents so that I can interact with multiple members of the organization.

**Why this priority**: Multi-agent interaction is core to the organizational simulation.

**Independent Test**:
- Chat with Agent A, switch to Agent B, chat, then switch back to Agent A.
- Verify each agent's conversation history is preserved independently.

**Acceptance Scenarios**:

1. **Given** I am chatting with Agent A, **When** I click on Agent B in the Control Panel, **Then** the chat panel switches to Agent B's conversation.
2. **Given** I switch from Agent A to Agent B and back, **When** I return to Agent A, **Then** the previous conversation history with Agent A is still visible.

---

### Edge Cases

- What happens when the Gemini API key is missing or invalid? Display a clear error message; do not crash.
- What happens when the Gemini API rate limit is exceeded? Show a user-friendly retry message.
- What happens when an agent has empty personality files? Use sensible defaults; the agent should still respond.
- What happens when the network is disconnected mid-conversation? Show connection error; preserve local message state.

## Requirements

### Functional Requirements

- **FR-001**: Backend MUST provide a `POST /agents/{id}/chat` endpoint that accepts a user message and returns an AI-generated agent response.
- **FR-002**: Backend MUST construct a Gemini prompt that includes the agent's soul, memory, values, and goal as system context.
- **FR-003**: Backend MUST pass the conversation history (up to a reasonable token limit) to Gemini for multi-turn context.
- **FR-004**: Frontend MUST display a chat panel with message input field and send button when an agent is selected.
- **FR-005**: Frontend MUST render chat messages in a scrollable list, distinguishing user messages from agent messages.
- **FR-006**: Frontend MUST manage per-agent conversation state (switching agents preserves each conversation).
- **FR-007**: System MUST handle Gemini API errors gracefully and display user-friendly error messages.

### Key Entities

- **ChatMessage**: Represents a single message in a conversation.
    - `role`: "user" or "agent"
    - `content`: The message text.
    - `timestamp`: When the message was sent.
- **ChatRequest**: The payload sent to the backend.
    - `message`: User's input text.
    - `history`: Array of prior ChatMessages for context.
- **ChatResponse**: The payload returned by the backend.
    - `message`: Agent's AI-generated response text.

### Non-Functional Requirements

- **NFR-001**: Agent response time SHOULD be under 10 seconds for typical messages.
- **NFR-002**: Conversation history sent to Gemini SHOULD be capped to avoid exceeding token limits (last 20 messages or equivalent).
- **NFR-003**: Chat UI MUST auto-scroll to the latest message.

## Success Criteria

### Measurable Outcomes

- **SC-001**: User can select an agent and send a message, receiving a character-consistent AI response.
- **SC-002**: Multi-turn conversations maintain context (agent references prior messages correctly).
- **SC-003**: Switching between agents preserves independent conversation histories.
- **SC-004**: Gemini API errors are caught and displayed as user-friendly messages (no unhandled crashes).
- **SC-005**: Chat response latency is under 10 seconds for messages under 200 characters.
