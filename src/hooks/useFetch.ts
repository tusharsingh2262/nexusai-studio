import { useEffect, useState } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useFetch<T = unknown>(url: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [nonce, setNonce] = useState(0)

  useEffect(() => {
    let isCancelled = false
    const controller = new AbortController()

    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(url, { signal: controller.signal })
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)
        const json = (await response.json()) as T
        if (!isCancelled) {
          setData(json)
        }
      } catch (err) {
        if (!isCancelled) {
          const message =
            err instanceof Error ? err.message : 'Unexpected error occurred'
          setError(message)
        }
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    void fetchData()

    return () => {
      isCancelled = true
      controller.abort()
    }
  }, [nonce, url])

  return {
    data,
    loading,
    error,
    refetch: () => setNonce((count) => count + 1),
  }
}

