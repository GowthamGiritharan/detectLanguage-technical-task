const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on,config){ },
    specPattern : "cypress/e2e/*.cy.js",
    env: {
      api_key: process.env.CYPRESS_API_KEY,
      invalid_api_key: 'f734a12136e54c13ae046bb2c7c19658',
      detect_url: 'https://ws.detectlanguage.com/0.2/detect',
      user_status_url: 'https://ws.detectlanguage.com/0.2/user/status',
      language_url: 'https://ws.detectlanguage.com/0.2/languages'
      }
  },
});
