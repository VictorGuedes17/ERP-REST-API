module.exports = {
  roots: ['<rootDir>/src'],
  testEnviroment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  clearMocks: true,
  testMatch: [
    "**/__tests__/**/*.[t]s?(x)",
  ],
}
