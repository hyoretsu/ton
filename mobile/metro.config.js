const { getDefaultConfig } = require('metro-config');
const path = require('path');

module.exports = (async () => {
    const {
        resolver: { sourceExts, assetExts },
    } = await getDefaultConfig();
    return {
        transformer: {
            babelTransformerPath: require.resolve('react-native-svg-transformer'),
            getTransformOptions: async () => ({
                transform: {
                    experimentalImportSupport: false,
                    inlineRequires: true,
                },
            }),
        },
        resolver: {
            assetExts: assetExts.filter(ext => ext !== 'svg'),
            nodeModulesPaths: ['../node_modules', './node_modules'],
            sourceExts: [...sourceExts, 'svg'],
        },
        watchFolders: [path.resolve(`${__dirname}/..`)],
    };
})();
