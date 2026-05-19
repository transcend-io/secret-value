module.exports = {
  ignore: [
    // Never look for test files in these folders
    '.yarn/**/*',
    '**/node_modules/**/*',
  ],
  extension: ['ts', 'js'],
  reporter: 'spec',
  reporterOptions: {
    configFile: 'mocha-reporter-config.json',
  },
  colors: true,
};
