const express = require('express')
const logger = require('heroku-logger')

const onUnknown = (s, res) => {
  logger.info(`${s}: is unknown`)
  res.json({
    response_type: 'ephemeral',
    text: `I don't know what ${s} means :(`
  })
}

const onKnown = (s, res) => (
  res.json({
    response_type: 'in_channel',
    text: s.name
  })
)

const onNoText = res => {
  return res.json({
    response_type: 'ephemeral',
    text: `Something went wrong trying to understand that :(`
  })
}

const onNoToken = res => {
  res.statusCode = 400
  return res.json({
    errors: [{
      code: 2,
      message: 'You must send a slack token'
    }]
  })
}

const onWrongToken = res => {
  res.statusCode = 401
  return res.end()
}

module.exports = (port, lookup, slackVerificationToken) => {
  const app = express()
  app.use(express.urlencoded({ extended: true }))

  app.post('/wat', (req, res) => {
    if (!req.body || !req.body.text) {
      logger.error(`there was no text in ${JSON.stringify(req.body)}`)
      return onNoText(res)
    }

    if (!req.body || !req.body.token) {
      return onNoToken(res)
    }

    if (req.body.token !== slackVerificationToken) {
      return onWrongToken(res)
    }

    logger.info(`wat lookup for ${req.body.text}`)
    lookup.acronym(
      req.body.text,
      s => onKnown(s, res),
      s => onUnknown(s, res)
    )
  })

  return app
}
