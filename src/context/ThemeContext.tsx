/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useLocalStorage<Theme>('nexusai-theme', 'light')

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () =>
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    [setTheme, theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

