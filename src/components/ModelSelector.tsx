import { Button } from './Button'
import { useApp } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'

export function ModelSelector() {
  const {
    models,
    loadingModels,
    modelsError,
    selectedModelId,
    selectModel,
  } = useApp()

  return (
    <section className="glass-panel p-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="section-title mb-1">Models</p>
          <h2 className="text-lg font-semibold">Model Selector</h2>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-900/60 dark:text-slate-300">
          {models.length} available
        </span>
      </div>

      {loadingModels && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-16 animate-pulse rounded-2xl bg-slate-200/70 dark:bg-slate-800/70"
            />
          ))}
        </div>
      )}

      {!loadingModels && modelsError && (
        <div className="rounded-2xl border border-red-200 bg-red-50/50 p-4 text-sm text-red-600 dark:border-red-400/30 dark:bg-red-500/10 dark:text-red-200">
          Failed to load models — {modelsError}
        </div>
      )}

      <div className="mt-4 space-y-3">
        <AnimatePresence initial={false}>
          {models.map((model) => {
            const isSelected = model.id === selectedModelId
            return (
              <motion.button
                key={model.id}
                onClick={() => selectModel(model.id)}
                className={`w-full rounded-2xl border px-4 py-3 text-left transition focus-ring ${
                  isSelected
                    ? 'border-brand-blue/50 bg-brand-blue/10 shadow-card dark:border-brand-cyan/50'
                    : 'border-white/20 bg-white/50 hover:border-brand-blue/30 dark:bg-slate-900/40'
                }`}
                aria-pressed={isSelected}
                layout
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{model.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {model.description}
                    </p>
                  </div>
                  <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-900/70 dark:text-slate-300">
                    {model.latency}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {model.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/70 px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-900/60 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.button>
            )
          })}
        </AnimatePresence>
      </div>

      <Button
        variant="secondary"
        size="sm"
        className="mt-4 w-full justify-center"
        aria-label="Request custom model access"
      >
        Request Custom Model
      </Button>
    </section>
  )
}

