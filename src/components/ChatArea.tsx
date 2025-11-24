import { useMemo } from 'react'
import { Button } from './Button'
import { ChatBubble } from './ChatBubble'
import { useApp } from '../context/AppContext'
import { downloadJSON } from '../utils/download'

export function ChatArea() {
  const { messages, isResponding } = useApp()

  const lastAssistantMessage = useMemo(
    () => [...messages].reverse().find((message) => message.role === 'assistant'),
    [messages],
  )

  const handleCopy = async () => {
    if (!lastAssistantMessage) return
    await navigator.clipboard.writeText(lastAssistantMessage.content)
  }

  return (
    <section className="glass-panel flex h-full flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="section-title mb-1">Conversation</p>
          <h2 className="text-lg font-semibold">Chat Output</h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            disabled={!lastAssistantMessage}
          >
            Copy
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => downloadJSON('nexusai-session', messages)}
            disabled={!messages.length}
          >
            Download JSON
          </Button>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-2">
        {messages.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 p-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400">
            Send a prompt to see the model response appear here. Use templates on
            the right to jumpstart.
          </div>
        )}
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        {isResponding && (
          <div className="rounded-full border border-white/20 bg-white/70 px-4 py-2 text-xs font-medium text-slate-500 dark:bg-slate-900/50">
            NexusAI is thinking…
          </div>
        )}
      </div>
    </section>
  )
}

