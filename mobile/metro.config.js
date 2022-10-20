const path = require('path');

module.exports = {
    resolver: {
        nodeModulesPaths: ['../node_modules', './node_modules'],
    },
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
    },
    watchFolders: [path.resolve(`${__dirname}/..`)],
};
