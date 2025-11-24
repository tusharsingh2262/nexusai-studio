import { useCallback, useEffect, useRef, useState } from 'react'

type Updater<T> = T | ((prev: T) => T)

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const defaultRef = useRef(defaultValue)

  const readValue = useCallback(() => {
    if (typeof window === 'undefined') return defaultValue
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? (JSON.parse(stored) as T) : defaultRef.current
    } catch {
      return defaultRef.current
    }
  }, [key])

  const [value, setValue] = useState<T>(readValue)

  useEffect(() => {
    setValue(readValue())
  }, [readValue])

  const setStoredValue = useCallback((newValue: Updater<T>) => {
    setValue((prev) => {
      const valueToStore =
        typeof newValue === 'function'
          ? (newValue as (value: T) => T)(prev)
          : newValue

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }

      return valueToStore
    })
  }, [key])

  return [value, setStoredValue] as const
}

