const express = require('express')

module.exports = (port, lookup, slackVerificationToken) => {
  const app = express()
  app.use(express.urlencoded({ extended: true }))

  require('./wat-route.js').register(app, lookup, slackVerificationToken)

  return app
}
