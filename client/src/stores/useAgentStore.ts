import { create } from 'zustand'
import { fetchAgents, type Agent } from '../services/api'

interface AgentStore {
  agents: Agent[]
  loading: boolean
  error: string | null
  loadAgents: () => Promise<void>
}

export const useAgentStore = create<AgentStore>((set) => ({
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
}))
