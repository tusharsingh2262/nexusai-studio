import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Button } from './Button'

interface ModalProps {
  open: boolean
  title: string
  description?: string
  onClose: () => void
  children: ReactNode
  primaryAction?: {
    label: string
    onClick: () => void
  }
}

export function Modal({
  open,
  title,
  description,
  onClose,
  children,
  primaryAction,
}: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="glass-panel w-full max-w-md p-6"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">{title}</h2>
                {description && (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {description}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="focus-ring rounded-full p-1 text-slate-500 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-slate-800/60"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div>{children}</div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="ghost" onClick={onClose} size="sm">
                Cancel
              </Button>
              {primaryAction && (
                <Button size="sm" onClick={primaryAction.onClick}>
                  {primaryAction.label}
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

