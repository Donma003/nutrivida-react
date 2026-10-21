module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'vite'],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-vite',
      'karma-coverage'
    ],
    files: [
      { pattern: 'src/**/*.spec.jsx', type: 'module', watched: false, served: false }
    ],
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' }
      ]
    },
    browsers: ['ChromeHeadless'],
    singleRun: true
  })
}