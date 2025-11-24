import { useTheme } from '../context/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className="focus-ring flex items-center gap-2 rounded-full border border-white/20 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 shadow-card transition hover:-translate-y-0.5 dark:bg-slate-900/50 dark:text-slate-100"
      aria-label="Toggle theme"
    >
      <span
        className={`text-lg ${isDark ? 'text-amber-300' : 'text-brand-blue'}`}
      >
        {isDark ? '🌙' : '☀️'}
      </span>
      {isDark ? 'Dark' : 'Light'} mode
    </button>
  )
}

