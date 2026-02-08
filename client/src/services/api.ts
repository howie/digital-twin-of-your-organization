import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

export interface Agent {
  id: string
  name: string
  soul: string
  memory: string
  values: string
  goal: string
}

export async function fetchAgents(): Promise<Agent[]> {
  const { data } = await api.get<Agent[]>('/agents')
  return data
}

export async function fetchAgent(id: string): Promise<Agent> {
  const { data } = await api.get<Agent>(`/agents/${id}`)
  return data
}

export async function healthCheck(): Promise<{ status: string }> {
  const { data } = await api.get<{ status: string }>('/health')
  return data
}
