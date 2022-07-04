const {makeMetroConfig} = require('@rnx-kit/metro-config');

const config = makeMetroConfig({
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  projectRoot: __dirname,
  resolver: {
    resolverMainFields: ['react-native', 'browser', 'main'],
  },
});

module.exports = config;
