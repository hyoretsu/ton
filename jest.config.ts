import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
 collectCoverageFrom: [
  'src/data/hooks/*.tsx',
  'src/pages/**/*.tsx',
  'src/ui/components/**/*.tsx',
  '!src/data/hooks/index.tsx',
 ],
 clearMocks: true,
 collectCoverage: true,
 coverageDirectory: 'coverage',
 coverageReporters: ['text-summary', 'lcov'],
 moduleFileExtensions: ['tsx', 'ts', 'js', 'json'],
 preset: 'react-native',
 roots: ['<rootDir>/src'],
 setupFilesAfterEnv: [
  '@testing-library/jest-native/extend-expect',
  './node_modules/react-native-gesture-handler/jestSetup.js',
  '<rootDir>/jest.setup.ts',
 ],
 testMatch: ['<rootDir>/src/__tests__/**/*.spec.{ts,tsx}'],
 transformIgnorePatterns: ['<rootDir>/node_modules/'],
};

export default config;
