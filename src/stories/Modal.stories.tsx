import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal } from '../components/Modal'
import { Button } from '../components/Button'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    open: true,
    title: 'Save Prompt Template',
    description: 'Templates sync locally so you can reuse workflows.',
    children: (
      <p className="text-sm text-slate-500">
        Storybook renders the same modal experience you see in the app. Use it to verify focus traps,
        spacing, and contrast.
      </p>
    ),
    primaryAction: {
      label: 'Save',
      onClick: () => undefined,
    },
    onClose: () => undefined,
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

const ModalPreview = (args: Story['args']) => {
  const [open, setOpen] = useState(args?.open ?? true)
  const handleClose = () => {
    setOpen(false)
    args?.onClose?.()
  }
  const handlePrimaryClick = () => {
    args?.primaryAction?.onClick?.()
    setOpen(false)
  }

  const resolvedArgs = {
    ...args,
    title: args?.title ?? 'Save Prompt Template',
    description: args?.description ?? '',
    children:
      args?.children ??
      'Storybook renders the same modal experience you see in the app. Use it to verify focus traps, spacing, and contrast.',
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        {...resolvedArgs}
        open={open}
        onClose={handleClose}
        primaryAction={
          args?.primaryAction
            ? {
                ...args.primaryAction,
                onClick: handlePrimaryClick,
              }
            : undefined
        }
      />
    </>
  )
}

export const Playground: Story = {
  args: {
    open: true,
  },
  render: (args) => <ModalPreview {...args} />,
}

export const DarkMode: Story = {
  args: {
    open: true,
  },
  parameters: {
    backgrounds: { default: 'night' },
  },
  render: (args) => <ModalPreview {...args} />,
}

