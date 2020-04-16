// Karma configuration
// Generated on Thu Apr 09 2020 11:59:00 GMT+0800 (GMT+08:00)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      '*.js',
      'test/**/*[sS]pec.js'
    ],

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),   // 生成 debug 详情页面
      require('karma-coverage-istanbul-reporter'),  // 生成测试覆盖率统计页面
    ],

    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // kjhtml 是 karma-jasmine-html-reporter 所需的配置
    reporters: ['progress', 'kjhtml'],

    // karma-jasmine-html-reporter 所需的配置
    jasmineHtmlReporter: {
      suppressAll: true, // Suppress all messages (overrides other suppress settings)
      suppressFailed: true // Suppress failed messages
    },


    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'),
      reports: ['html', 'lcovonly', 'text-summary']
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
