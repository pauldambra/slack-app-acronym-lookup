const appFactory = require('./app-factory')
const logger = require('heroku-logger')
const lookup = require('./lookup')
lookup.set(require('./config.json'))

const port = process.env.PORT || 3000

const token = process.env.SLACK_TOKEN
if (!token) {
  throw new Error('you must set the SLACK_TOKEN environment variable')
}

const app = appFactory(port, lookup, token)

app.listen(
  port,
  () => logger.info(`server started on ${port}`))

module.exports = app
