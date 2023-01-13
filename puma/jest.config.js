module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['**/tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['vue', 'ts', 'js', 'json'],
  transformIgnorePatterns: ['/node_modules/(?!vee-validate/dist/rules|bootstrap|vue-multiselect|@fortawesome)'],

};
