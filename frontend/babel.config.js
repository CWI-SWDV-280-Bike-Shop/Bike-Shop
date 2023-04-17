module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
            '@api': './src/api',
            '@assets': './src/assets',
            '@components': './src/components',
            '@context': './src/context',
            '@pages': './src/pages',
            '@styles': './src/styles',
            '@types': './src/types',
          },
        },
      ],
    ],
  };
};
