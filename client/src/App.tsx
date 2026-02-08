import { useEffect } from 'react'
import PhaserGame from './game/PhaserGame'
import { useAgentStore } from './stores/useAgentStore'

function App() {
  const { agents, loading, error, loadAgents } = useAgentStore()

  useEffect(() => {
    loadAgents()
  }, [loadAgents])

  return (
    <div className="flex h-screen w-screen bg-gray-900 text-gray-100">
      {/* Left: Game Canvas */}
      <div className="flex-1 flex items-center justify-center p-4">
        <PhaserGame />
      </div>

      {/* Right: Control Panel */}
      <div className="w-80 border-l border-gray-700 p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Control Panel</h2>

        <h3 className="text-sm font-semibold text-gray-400 mb-2">Agents</h3>

        {loading && <p className="text-gray-500 text-sm">Loading agents...</p>}

        {error && (
          <p className="text-red-400 text-sm">Error: {error}</p>
        )}

        {!loading && !error && agents.length === 0 && (
          <p className="text-gray-500 text-sm">No agents found.</p>
        )}

        <ul className="space-y-2">
          {agents.map((agent) => (
            <li
              key={agent.id}
              className="bg-gray-800 rounded px-3 py-2 text-sm"
            >
              {agent.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
