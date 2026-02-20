import { useEffect } from 'react'
import ChatPanel from './components/ChatPanel'
import PhaserGame from './game/PhaserGame'
import { useAgentStore } from './stores/useAgentStore'

function App() {
  const { agents, loading, error, loadAgents, selectedAgentId, selectAgent } =
    useAgentStore()

  useEffect(() => {
    loadAgents()
  }, [loadAgents])

  return (
    <div className="flex h-screen w-screen bg-gray-900 text-gray-100">
      {/* Left: Game Canvas */}
      <div className="flex-1 flex items-center justify-center p-4">
        <PhaserGame />
      </div>

      {/* Right: Control Panel + Chat */}
      <div className="w-96 border-l border-gray-700 flex flex-col">
        {/* Agent List */}
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold mb-3">Control Panel</h2>

          <h3 className="text-sm font-semibold text-gray-400 mb-2">Agents</h3>

          {loading && <p className="text-gray-500 text-sm">Loading agents...</p>}

          {error && (
            <p className="text-red-400 text-sm">Error: {error}</p>
          )}

          {!loading && !error && agents.length === 0 && (
            <p className="text-gray-500 text-sm">No agents found.</p>
          )}

          <ul className="space-y-1">
            {agents.map((agent) => (
              <li
                key={agent.id}
                onClick={() => selectAgent(agent.id)}
                className={`rounded px-3 py-2 text-sm cursor-pointer transition-colors ${
                  selectedAgentId === agent.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                {agent.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Panel */}
        <ChatPanel />
      </div>
    </div>
  )
}

export default App
