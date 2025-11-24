import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../components/Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Click me',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DarkMode: Story = {
  args: {
    children: 'Dark action',
  },
  parameters: {
    backgrounds: { default: 'night' },
  },
}


