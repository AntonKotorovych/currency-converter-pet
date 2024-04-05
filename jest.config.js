/** @type {import('jest').Config} */

const config = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageReporters: ['text', 'json-summary', 'html'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  moduleFileExtensions: ['js', 'jsx']
};

export default config;
