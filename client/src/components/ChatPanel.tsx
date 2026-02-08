import { useEffect, useRef, useState } from 'react'
import { useAgentStore } from '../stores/useAgentStore'

export default function ChatPanel() {
  const {
    agents,
    selectedAgentId,
    chatHistories,
    sending,
    chatError,
    sendChatMessage,
  } = useAgentStore()

  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const selectedAgent = agents.find((a) => a.id === selectedAgentId)
  const messages = selectedAgentId ? (chatHistories[selectedAgentId] ?? []) : []

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, sending])

  if (!selectedAgent) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
        Select an agent to start chatting
      </div>
    )
  }

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed || sending || !selectedAgentId) return
    setInput('')
    sendChatMessage(selectedAgentId, trimmed)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Header */}
      <div className="px-3 py-2 border-b border-gray-700 text-sm font-semibold">
        Chat with {selectedAgent.name}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 && (
          <p className="text-gray-500 text-sm text-center mt-4">
            Say hello to {selectedAgent.name}!
          </p>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-100'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {sending && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-gray-400 rounded-lg px-3 py-2 text-sm">
              Thinking...
            </div>
          </div>
        )}

        {chatError && (
          <div className="text-red-400 text-xs text-center">{chatError}</div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            disabled={sending}
            className="flex-1 bg-gray-800 text-gray-100 rounded px-3 py-2 text-sm
                       placeholder-gray-500 outline-none focus:ring-1 focus:ring-blue-500
                       disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={sending || !input.trim()}
            className="bg-blue-600 text-white rounded px-4 py-2 text-sm font-medium
                       hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
