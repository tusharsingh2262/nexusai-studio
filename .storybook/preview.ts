import '../src/styles/globals.css'

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'surface',
      values: [
        { name: 'surface', value: '#F8FAFC' },
        { name: 'night', value: '#020617' },
      ],
    },
    options: {
      storySort: {
        order: ['Components', ['Button', 'Slider', 'Modal', 'ChatBubble']],
      },
    },
  },
}

export default preview


