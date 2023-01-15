export default {
  displayName: {
    name: '@core',
    color: 'blue'
  },

  clearMocks: true,

  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    },
  },

  testRegex: ".*\\..*spec\\.ts$",

  transform: {
    "^.+\\.ts?$": ["@swc/jest"],
  },

};
