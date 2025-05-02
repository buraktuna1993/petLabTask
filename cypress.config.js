const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
    },
    supportFile: 'cypress/support/index.js'
  },
  pageLoadTimeout: 60000,
  responseTimeout: 40000,
  retries: {
    "runMode": 2,
    "openMode": 2
  },
 // blockHosts: "*.widget.trustpilot.com/trustbox-data"

});
