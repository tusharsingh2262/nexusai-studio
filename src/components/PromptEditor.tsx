import { useState } from 'react'
import { Button } from './Button'
import { Modal } from './Modal'
import { useApp } from '../context/AppContext'

export function PromptEditor() {
  const {
    promptDraft,
    setPromptDraft,
    saveTemplate,
    templates,
    loadTemplate,
    loadingTemplates,
    templatesError,
  } = useApp()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [templateName, setTemplateName] = useState('')
  const [templateDescription, setTemplateDescription] = useState('')

  const handleSaveTemplate = () => {
    if (!promptDraft.trim()) return
    saveTemplate({
      name: templateName.trim() || 'Untitled template',
      description: templateDescription.trim() || 'Saved from Prompt Editor',
      prompt: promptDraft,
    })
    setTemplateName('')
    setTemplateDescription('')
    setIsModalOpen(false)
  }

  return (
    <section className="glass-panel flex flex-col gap-5 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="section-title mb-1">Prompting</p>
          <h2 className="text-lg font-semibold">Prompt Editor</h2>
        </div>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setIsModalOpen(true)}
          disabled={!promptDraft.trim()}
        >
          Save Template
        </Button>
      </div>

      <label className="flex flex-col gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
        Prompt
        <textarea
          className="focus-ring min-h-[240px] rounded-2xl border border-white/20 bg-white/70 p-4 text-sm text-slate-700 shadow-inner dark:bg-slate-900/60 dark:text-slate-100"
          value={promptDraft}
          onChange={(event) => setPromptDraft(event.target.value)}
          placeholder="Describe intent, tone, format, constraints..."
        />
      </label>

      <div>
        <p className="section-title mb-2">Templates</p>
        {loadingTemplates && (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-14 animate-pulse rounded-2xl bg-slate-200/70 dark:bg-slate-800/70"
              />
            ))}
          </div>
        )}

        {!loadingTemplates && templatesError && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 text-sm text-amber-700 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-200">
            Failed to load templates — {templatesError}
          </div>
        )}

        <div className="max-h-64 space-y-3 overflow-y-auto pr-2">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => loadTemplate(template.id)}
              className="w-full rounded-2xl border border-white/10 bg-white/70 p-4 text-left transition hover:border-brand-blue/40 focus-ring dark:bg-slate-900/50"
            >
              <p className="text-sm font-semibold">{template.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {template.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Save Prompt Template"
        description="Templates sync locally so you can reuse workflows."
        primaryAction={{
          label: 'Save',
          onClick: handleSaveTemplate,
        }}
      >
        <div className="space-y-4">
          <label className="flex flex-col gap-2 text-sm text-slate-500">
            Template name
            <input
              type="text"
              className="focus-ring rounded-xl border border-white/10 bg-white/80 px-3 py-2 text-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
              value={templateName}
              onChange={(event) => setTemplateName(event.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-500">
            Description
            <textarea
              className="focus-ring rounded-xl border border-white/10 bg-white/80 px-3 py-2 text-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
              value={templateDescription}
              onChange={(event) => setTemplateDescription(event.target.value)}
              rows={3}
            />
          </label>
        </div>
      </Modal>
    </section>
  )
}

