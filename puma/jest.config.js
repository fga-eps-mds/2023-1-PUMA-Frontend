module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['**/tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  transformIgnorePatterns: ['/node_modules/(?!vee-validate/dist/rules|bootstrap|vue-multiselect|@fortawesome)'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleFileExtensions: [
    'js',
    'mjs',
    'cjs',
    'vue',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node',
  ],
  collectCoverage: true,
  collectCoverageFrom: ['./src/**'],
  coveragePathIgnorePatterns: [
    '/src/server.js',
  ],
  testFailureExitCode: 0,
  reporters: [
    'default',
    [
      'jest-sonar',
      {
        outputDirectory: 'coverage/',
        outputName: 'jest-report.xml',
        reportedFilePath: 'relative',
        relativeRootDir: '<rootDir>/../',
      },
    ],
  ],
};
