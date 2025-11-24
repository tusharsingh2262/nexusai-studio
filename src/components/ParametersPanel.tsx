import { Slider } from './Slider'
import { Button } from './Button'
import { useApp } from '../context/AppContext'

export function ParametersPanel() {
  const { parameters, updateParameter } = useApp()

  return (
    <section className="glass-panel flex flex-col gap-5 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="section-title mb-1">Controls</p>
          <h2 className="text-lg font-semibold">Parameters</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            updateParameter('temperature', 0.5)
            updateParameter('topP', 0.9)
            updateParameter('presencePenalty', 0.1)
            updateParameter('maxTokens', 512)
          }}
        >
          Reset
        </Button>
      </div>

      <Slider
        id="temperature"
        label="Temperature"
        helper="Higher = more exploratory."
        min={0}
        max={1}
        step={0.01}
        value={parameters.temperature}
        onChange={(value) => updateParameter('temperature', Number(value.toFixed(2)))}
      />

      <Slider
        id="topP"
        label="Top P"
        helper="Limits token sampling to top probability mass."
        min={0}
        max={1}
        step={0.01}
        value={parameters.topP}
        onChange={(value) => updateParameter('topP', Number(value.toFixed(2)))}
      />

      <Slider
        id="presencePenalty"
        label="Presence Penalty"
        helper="Discourages repetition."
        min={0}
        max={1}
        step={0.01}
        value={parameters.presencePenalty}
        onChange={(value) =>
          updateParameter('presencePenalty', Number(value.toFixed(2)))
        }
      />

      <label className="flex flex-col gap-2 text-sm font-medium text-slate-500 dark:text-slate-300">
        Max Tokens
        <input
          type="number"
          min={64}
          max={4000}
          step={32}
          value={parameters.maxTokens}
          onChange={(event) =>
            updateParameter('maxTokens', Number(event.target.value))
          }
          className="focus-ring rounded-2xl border border-white/10 bg-white/80 px-4 py-2 text-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
        />
      </label>
    </section>
  )
}

