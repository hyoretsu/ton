const {
  compilerOptions: { paths },
} = require('./tsconfig.json');

const entries = Object.entries(paths);

module.exports = {
  comments: false,
  ignore: ['**/*.spec.ts', 'src/@types/*', 'src/dtos/*'],
  minified: true,
  plugins: [
    [
      'module-resolver',
      {
        alias: Object.assign(
          {},
          ...entries.map(entry => ({
            [entry[0].replace('/*', '')]: entry[1].map(path => `./src/${path.replace('/*', '')}`),
          })),
        ),
      },
    ],
    'transform-typescript-metadata',
    ['@babel/proposal-decorators', { legacy: true }],
    '@babel/proposal-class-properties',
  ],
  presets: [['@babel/env', { targets: { node: 'current' } }], '@babel/typescript'],
};
