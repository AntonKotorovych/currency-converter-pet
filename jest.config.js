/** @type {import('jest').Config} */

const config = {
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageReporters: ['text', 'json-summary', 'html'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  moduleFileExtensions: ['js', 'jsx', 'tsx'],
  modulePaths: ['<rootDir>/src'],
  modulePathIgnorePatterns: ['<rootDir>/src/index.jsx']
};

export default config;
