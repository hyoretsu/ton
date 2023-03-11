const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = phase => {
    const baseConf = {
        compiler: {
            styledComponents: true,
        },
        eslint: {
            ignoreDuringBuilds: true,
        },
        images: {
            domains: ['localhost', 'odontologiadigital.ccs.ufpb.br'],
        },
        productionBrowserSourceMaps: true,
        reactStrictMode: true,
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
