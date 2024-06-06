// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const {
    compilerOptions: { paths },
} = require('./tsconfig.json');

const pathEntries = Object.entries(paths);

module.exports = (async () => {
    const config = getDefaultConfig(__dirname);

    const { transformer, resolver } = config;

    return {
        ...config,
        transformer: {
            ...transformer,
            babelTransformerPath: require.resolve('react-native-svg-transformer'),
        },
        resolver: {
            ...resolver,
            assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
            // extraNodeModules: {
            //     assets: path.resolve(__dirname, 'src', 'assets'),
            //     screens: path.resolve(__dirname, 'src', 'screens'),
            // },
            resolveRequest: (context, moduleName, platform) => {
                if (moduleName.startsWith('@')) {
                    // eslint-disable-next-line no-restricted-syntax
                    for (const [alias, filePath] of pathEntries) {
                        if (moduleName.match(alias)) {
                            const normalAlias = alias.slice(0, -1);

                            return context.resolveRequest(
                                context,
                                path.resolve('./src', filePath[0].replace('*', moduleName.split(normalAlias)[1])),
                                platform,
                            );
                        }
                    }
                }

                return context.resolveRequest(context, moduleName, platform);
            },
            sourceExts: [...resolver.sourceExts, 'svg'],
        },
    };
})();
