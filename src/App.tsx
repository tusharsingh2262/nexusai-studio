import { MainLayout } from './layouts/MainLayout'
import { ModelSelector } from './components/ModelSelector'
import { ParametersPanel } from './components/ParametersPanel'
import { PromptEditor } from './components/PromptEditor'
import { ChatArea } from './components/ChatArea'
import { PromptComposer } from './components/PromptComposer'
import { ThemeToggle } from './components/ThemeToggle'

function App() {
  return (
    <MainLayout
      sidebar={
        <>
          <ModelSelector />
          <ParametersPanel />
        </>
      }
      main={<ChatArea />}
      rightPane={<PromptEditor />}
      footer={<PromptComposer />}
      headerActions={<ThemeToggle />}
    />
  )
}

export default App
