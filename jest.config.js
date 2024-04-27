/** @type {import('jest').Config} */

const config = {
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coverageReporters: ['text', 'json-summary', 'html'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343]
        },
        astTransformers: {
          before: [
            {
              path: 'node_modules/ts-jest-mock-import-meta', // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
              options: {
                metaObjectReplacement: {
                  env: {
                    VITE_NBU_CURRENCY_EXCHANGE_API: 'https://fake.api.com'
                  }
                }
              }
            }
          ]
        }
      }
    ]
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  moduleFileExtensions: ['js', 'jsx', 'tsx', 'ts'],
  modulePaths: ['<rootDir>/src'],
  modulePathIgnorePatterns: ['<rootDir>/src/index.tsx', '<rootDir>/src/types/declaration.d.ts']
};

export default config;
