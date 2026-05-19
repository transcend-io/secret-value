module.exports = {
  ignore: [
    // Never look for test files in these folders
    '**/build/**/*',
    '.yarn/**/*',
    '**/node_modules/**/*',
  ],
  extension: ['ts'],
  reporter: 'spec',
  reporterOptions: {
    configFile: 'mocha-reporter-config.json',
  },
  colors: true,
};
