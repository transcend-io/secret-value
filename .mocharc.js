const { join } = require('path');

module.exports = {
  require: ['ts-node/register/transpile-only', 'tsconfig-paths/register'],
  ignore: [
    '**/build/**/*',
    '.yarn/**/*',
  ],
  extension: ['ts'],
  reporter: 'spec',
  timeout: process.env.MOCHA_TIMEOUT || 75000,
  slow: process.env.MOCHA_SLOW || 30000,
  colors: true,
};
