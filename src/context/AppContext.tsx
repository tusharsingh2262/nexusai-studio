/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { useFetch } from '../hooks/useFetch'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { nanoid } from 'nanoid'

export interface Model {
  id: string
  name: string
  description: string
  latency: string
  tags: string[]
}

export interface Template {
  id: string
  name: string
  description: string
  prompt: string
}

export interface Parameters {
  temperature: number
  maxTokens: number
  topP: number
  presencePenalty: number
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

interface AppContextValue {
  models: Model[]
  templates: Template[]
  loadingModels: boolean
  loadingTemplates: boolean
  modelsError: string | null
  templatesError: string | null
  selectedModelId: string | null
  selectModel: (id: string) => void
  parameters: Parameters
  updateParameter: (key: keyof Parameters, value: number) => void
  promptDraft: string
  setPromptDraft: (value: string) => void
  saveTemplate: (template: Omit<Template, 'id'>) => void
  loadTemplate: (id: string) => void
  messages: Message[]
  sendMessage: (message: string) => Promise<void>
  isResponding: boolean
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export function AppProvider({ children }: PropsWithChildren) {
  const {
    data: modelData,
    loading: loadingModels,
    error: modelsError,
  } = useFetch<Model[]>('/api/models.json')
  const {
    data: templateData,
    loading: loadingTemplates,
    error: templatesError,
  } = useFetch<Template[]>('/api/templates.json')

  const [customTemplates, setCustomTemplates] = useLocalStorage<Template[]>(
    'nexusai-templates',
    [],
  )
  const [parameters, setParameters] = useState<Parameters>({
    temperature: 0.5,
    maxTokens: 512,
    topP: 0.9,
    presencePenalty: 0.1,
  })
  const [selectedModelIdState, setSelectedModelIdState] = useState<string | null>(null)
  const [promptDraft, setPromptDraft] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isResponding, setIsResponding] = useState(false)

  const selectedModelId = useMemo(() => {
    if (!modelData?.length) return null
    if (selectedModelIdState && modelData.some((model) => model.id === selectedModelIdState)) {
      return selectedModelIdState
    }
    return modelData[0].id
  }, [modelData, selectedModelIdState])

  const templates = useMemo(
    () => [...(templateData ?? []), ...customTemplates],
    [customTemplates, templateData],
  )

  const selectModel = useCallback((id: string) => {
    setSelectedModelIdState(id)
  }, [])

  const updateParameter = useCallback(
    (key: keyof Parameters, value: number) => {
      setParameters((prev) => ({ ...prev, [key]: value }))
    },
    [],
  )

  const saveTemplate = useCallback(
    (template: Omit<Template, 'id'>) => {
      const newTemplate: Template = {
        id: nanoid(),
        ...template,
      }
      setCustomTemplates((prev) => [...prev, newTemplate])
    },
    [setCustomTemplates],
  )

  const loadTemplate = useCallback(
    (id: string) => {
      const template = templates.find((item) => item.id === id)
      if (template) {
        setPromptDraft(template.prompt)
      }
    },
    [templates],
  )

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return
      const newMessage: Message = {
        id: nanoid(),
        role: 'user',
        content,
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, newMessage])
      setPromptDraft('')
      setIsResponding(true)

      await new Promise((resolve) => setTimeout(resolve, 900))
      const modelName =
        modelData?.find((model) => model.id === selectedModelId)?.name ??
        'NexusAI Model'

      const assistantMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: `**${modelName}** response\n\nPrompt received:\n${content}\n\nParameters → temperature: ${parameters.temperature.toFixed(2)}, max tokens: ${parameters.maxTokens}, top_p: ${parameters.topP.toFixed(
          2,
        )}, presence penalty: ${parameters.presencePenalty.toFixed(
          2,
        )}\n\n_This is a simulated response for prototype purposes._`,
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsResponding(false)
    },
    [
      modelData,
      parameters.maxTokens,
      parameters.presencePenalty,
      parameters.temperature,
      parameters.topP,
      selectedModelId,
    ],
  )

  const value = useMemo<AppContextValue>(
    () => ({
      models: modelData ?? [],
      templates,
      loadingModels,
      loadingTemplates,
      modelsError,
      templatesError,
      selectedModelId,
      selectModel,
      parameters,
      updateParameter,
      promptDraft,
      setPromptDraft,
      saveTemplate,
      loadTemplate,
      messages,
      sendMessage,
      isResponding,
    }),
    [
      isResponding,
      loadTemplate,
      loadingModels,
      loadingTemplates,
      modelsError,
      modelData,
      messages,
      parameters,
      promptDraft,
      saveTemplate,
      selectModel,
      selectedModelId,
      sendMessage,
      templates,
      templatesError,
      updateParameter,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

