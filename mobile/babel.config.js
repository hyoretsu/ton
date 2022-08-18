const {
  compilerOptions: { paths },
} = require('./tsconfig.json');

const entries = Object.entries(paths);

entries.map(entry => ({ [entry[0]]: entry[1] }));

module.exports = {
  presets: [['module:metro-react-native-babel-preset', { useTransformReactJSXExperimental: true }]],
  plugins: [
    ['@babel/transform-react-jsx', { runtime: 'automatic' }],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.json', '.ts', '.tsx'],
        alias: Object.assign(
          {},
          ...entries.map(entry => ({
            [entry[0].replace('/*', '')]: entry[1].map(path => `./src/${path.replace('/*', '')}`),
          })),
        ),
      },
    ],
  ],
};
