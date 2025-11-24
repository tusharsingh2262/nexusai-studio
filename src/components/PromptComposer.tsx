import { Button } from './Button'
import { useApp } from '../context/AppContext'
import { useCallback } from 'react'

export function PromptComposer() {
  const { promptDraft, setPromptDraft, sendMessage, isResponding } = useApp()

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      await sendMessage(promptDraft)
    },
    [promptDraft, sendMessage],
  )

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel flex flex-col gap-3 rounded-3xl p-4 md:flex-row md:items-center"
    >
      <label className="sr-only" htmlFor="promptComposer">
        Prompt NexusAI
      </label>
      <textarea
        id="promptComposer"
        className="focus-ring flex-1 rounded-2xl border border-white/10 bg-white/80 px-4 py-3 text-sm text-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
        placeholder="Ask NexusAI Studio anything..."
        value={promptDraft}
        onChange={(event) => setPromptDraft(event.target.value)}
        rows={3}
      />
      <Button
        type="submit"
        className="md:self-end"
        disabled={!promptDraft.trim() || isResponding}
      >
        {isResponding ? 'Generating…' : 'Send'}
      </Button>
    </form>
  )
}

