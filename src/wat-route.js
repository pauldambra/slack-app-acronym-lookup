const logger = require('heroku-logger')
const responseMapper = require('./response-mapper')

const onUnknown = (s, res) => {
  logger.info(`${s}: is unknown`)
  return res.json({
    response_type: 'ephemeral',
    text: `I don't know what ${s} means :(`
  })
}

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

module.exports = {
  register: (app, lookup, slackVerificationToken) => {
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
        s => res.json(responseMapper.mapKnown(s)),
        s => onUnknown(s, res)
      )
    })
  }
}
