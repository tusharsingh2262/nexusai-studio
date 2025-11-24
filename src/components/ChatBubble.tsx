import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Message } from '../context/AppContext'
import clsx from 'clsx'

interface ChatBubbleProps {
  message: Message
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isAssistant = message.role === 'assistant'

  return (
    <div
      className={clsx(
        'flex w-full gap-3',
        isAssistant ? 'justify-start' : 'justify-end',
      )}
    >
      {isAssistant && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-indigo/30 text-sm text-brand-indigo">
          AI
        </div>
      )}
      <article
        className={clsx(
          'max-w-xl rounded-2xl px-4 py-3 text-sm shadow-card',
          isAssistant
            ? 'bg-white/80 text-slate-700 dark:bg-slate-900/70 dark:text-slate-100'
            : 'bg-gradient-to-r from-brand-blue to-brand-indigo text-white',
        )}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => (
              <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-brand-indigo dark:text-brand-cyan">
                {children}
              </strong>
            ),
            code: ({ children }) => (
              <code className="rounded-md bg-slate-900/10 px-1 py-0.5 text-[13px] dark:bg-slate-100/10">
                {children}
              </code>
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
        <p className="mt-2 text-right text-[11px] uppercase tracking-wide text-slate-400">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </article>
      {!isAssistant && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-sm text-slate-600 dark:bg-slate-900/40 dark:text-slate-100">
          You
        </div>
      )}
    </div>
  )
}

