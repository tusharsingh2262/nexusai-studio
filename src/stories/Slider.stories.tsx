import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Slider } from '../components/Slider'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

const baseArgs = {
  id: 'storybook-slider',
  label: 'Temperature',
  min: 0,
  max: 1,
  step: 0.01,
  helper: 'Use sliders to fine tune behavior.',
  value: 0.5,
  onChange: () => undefined,
}

const SliderPreview = (initialValue: number) => (args: Story['args']) => {
  const [value, setValue] = useState(initialValue)
  return (
    <Slider
      {...args}
      value={value}
      onChange={(next) => {
        setValue(next)
        args?.onChange?.(next)
      }}
    />
  )
}

export const Default: Story = {
  args: {
    ...baseArgs,
    value: 0.5,
  },
  render: SliderPreview(0.5),
}

export const HighValue: Story = {
  args: {
    ...baseArgs,
    value: 0.85,
  },
  render: SliderPreview(0.85),
}

export const DarkMode: Story = {
  args: {
    ...baseArgs,
    value: 0.42,
  },
  parameters: {
    backgrounds: { default: 'night' },
  },
  render: SliderPreview(0.42),
}

