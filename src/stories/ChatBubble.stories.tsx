import type { Meta, StoryObj } from '@storybook/react'
import { ChatBubble } from '../components/ChatBubble'
import type { Message } from '../context/AppContext'

const assistantMessage: Message = {
  id: 'assistant-1',
  role: 'assistant',
  content:
    '**NexusAI** ready. Provide a task description, tone, and output format to get started.',
  timestamp: new Date().toISOString(),
}

const userMessage: Message = {
  id: 'user-1',
  role: 'user',
  content: 'Draft a launch announcement email for the NexusAI Studio beta.',
  timestamp: new Date().toISOString(),
}

const meta = {
  title: 'Components/ChatBubble',
  component: ChatBubble,
  tags: ['autodocs'],
} satisfies Meta<typeof ChatBubble>

export default meta
type Story = StoryObj<typeof meta>

export const Assistant: Story = {
  args: {
    message: assistantMessage,
  },
}

export const User: Story = {
  args: {
    message: userMessage,
  },
}

export const DarkMode: Story = {
  args: {
    message: assistantMessage,
  },
  parameters: {
    backgrounds: { default: 'night' },
  },
}


