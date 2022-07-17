const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');
const {makeMetroConfig} = require('@rnx-kit/metro-config');
const path = require('path');

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
    resolveRequest: MetroSymlinksResolver(),
    resolverMainFields: ['react-native', 'browser', 'main'],
  },
});

config.resolver.extraNodeModules[
  '@babel/runtime/helpers/interopRequireDefault'
] =
  'C:\\Git\\react-freyja\\node_modules\\.pnpm\\@babel+runtime@7.18.6\\node_modules\\@babel\\runtime\\helpers\\interopRequireDefault';
console.log(config);

module.exports = config;
