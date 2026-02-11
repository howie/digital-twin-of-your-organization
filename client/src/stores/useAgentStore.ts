import { create } from 'zustand'
import { fetchAgents, sendMessage, type Agent, type ChatMessage } from '../services/api'

interface AgentStore {
  // Agent list
  agents: Agent[]
  loading: boolean
  error: string | null
  loadAgents: () => Promise<void>

  // Chat
  selectedAgentId: string | null
  chatHistories: Record<string, ChatMessage[]>
  sending: boolean
  chatError: string | null
  selectAgent: (id: string | null) => void
  sendChatMessage: (agentId: string, message: string) => Promise<void>
}

export const useAgentStore = create<AgentStore>((set, get) => ({
  // Agent list
  agents: [],
  loading: false,
  error: null,
  loadAgents: async () => {
    set({ loading: true, error: null })
    try {
      const agents = await fetchAgents()
      set({ agents, loading: false })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch agents'
      set({ error: message, loading: false })
    }
  },

  // Chat
  selectedAgentId: null,
  chatHistories: {},
  sending: false,
  chatError: null,

  selectAgent: (id) => {
    set({ selectedAgentId: id, chatError: null })
  },

  sendChatMessage: async (agentId, message) => {
    const { chatHistories } = get()
    const history = chatHistories[agentId] ?? []

    // Add user message immediately
    const userMessage: ChatMessage = { role: 'user', content: message }
    const updatedHistory = [...history, userMessage]
    set({
      chatHistories: { ...chatHistories, [agentId]: updatedHistory },
      sending: true,
      chatError: null,
    })

    try {
      const reply = await sendMessage(agentId, message, updatedHistory)
      const agentMessage: ChatMessage = { role: 'agent', content: reply }
      const { chatHistories: current } = get()
      const currentHistory = current[agentId] ?? []
      set({
        chatHistories: { ...current, [agentId]: [...currentHistory, agentMessage] },
        sending: false,
      })
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to send message'
      set({ sending: false, chatError: errorMsg })
    }
  },
}))
