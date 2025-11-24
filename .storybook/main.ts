const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  staticDirs: ['../public'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config: any) => {
    config?.module?.rules?.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              require.resolve('@babel/preset-react'),
              require.resolve('@babel/preset-typescript'),
            ],
          },
        },
      ],
    })
    config?.resolve?.extensions?.push('.ts', '.tsx')
    return config
  },
  docs: {
    autodocs: 'tag',
  },
}

export default config


