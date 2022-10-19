const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = phase => {
    const baseConf = {
        eslint: {
            ignoreDuringBuilds: true,
        },
        images: {
            domains: [''],
        },
        productionBrowserSourceMaps: true,
        reactStrictMode: true,
        styledComponents: true,
        swcMinify: true,
        typescript: {
            ignoreBuildErrors: true,
        },
    };

    // Dev-specific settings
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        Object.assign(baseConf, {});
    } else {
        Object.assign(baseConf, {});
    }

    return baseConf;
};
