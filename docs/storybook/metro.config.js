const {makeMetroConfig} = require('@rnx-kit/metro-config');
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');

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

console.log(config);

module.exports = config;
