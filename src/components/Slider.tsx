import clsx from 'clsx'
import type { ChangeEvent } from 'react'

interface SliderProps {
  id: string
  label: string
  min: number
  max: number
  step?: number
  value: number
  onChange: (value: number) => void
  helper?: string
}

export function Slider({
  id,
  label,
  min,
  max,
  step = 0.1,
  value,
  onChange,
  helper,
}: SliderProps) {
  const percent = ((value - min) / (max - min)) * 100

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value))
  }

  return (
    <label className="flex flex-col gap-3" htmlFor={id}>
      <div className="flex items-center justify-between text-sm font-medium text-slate-600 dark:text-slate-300">
        <span>{label}</span>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {value.toFixed(step < 1 ? 2 : 0)}
        </span>
      </div>
      <div className="relative h-3 rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="absolute inset-y-0 rounded-full bg-gradient-to-r from-brand-blue to-brand-indigo"
          style={{ width: `${percent}%` }}
        />
        <input
          type="range"
          id={id}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className={clsx(
            'focus-ring absolute inset-0 w-full appearance-none bg-transparent',
            '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow [&::-webkit-slider-thumb]:outline-none [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-brand-blue',
            'dark:[&::-webkit-slider-thumb]:bg-slate-900',
          )}
        />
      </div>
      {helper && (
        <p className="text-xs text-slate-500 dark:text-slate-400">{helper}</p>
      )}
    </label>
  )
}

