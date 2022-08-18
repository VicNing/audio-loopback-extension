// Karma configuration
// Generated on Fri Feb 11 2022 11:49:35 GMT+0800 (中国标准时间)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ['mocha', 'karma-typescript'],


    // list of files / patterns to load in the browser
    files: [
      "src/**/*",
      'tests/**/*'
    ],


    // list of files / patterns to exclude
    exclude: ["**/*/*.map"],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
      "src/**/*.ts": "karma-typescript", // *.tsx for React Jsx
      "tests/**/*.ts": "karma-typescript" // *.tsx for React Jsx
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ['progress'],


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
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ['chrome_custom'],

    customLaunchers: {
      chrome_custom: {
        base: "ChromeHeadless",
        flags: [
          "--disable-web-security",
          "--no-sandbox",
          "--use-fake-device-for-media-stream",
          "--use-fake-ui-for-media-stream",
          "--autoplay-policy=no-user-gesture-required",
        ],
      },
      firefox_custom: {
        base: "FirefoxHeadless",
        prefs: {
          "media.navigator.permission.disabled": true,
          "media.navigator.streams.fake": true,
        },
      },
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser instances should be started simultaneously
    concurrency: Infinity,

    browserConsoleLogOptions: {terminal: false},
    karmaTypescriptConfig: {
      compilerOptions: {
        target: "ES6"
      },
    }
  });
}
