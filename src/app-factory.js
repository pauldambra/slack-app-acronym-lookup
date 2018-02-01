const express = require('express')

const onUnknown = (s, res) => (
  res.json({
    response_type: 'ephemeral',
    text: `I don't know what ${s} means :(`
  })
)

const onKnown = (s, res) => (
  res.json({
    response_type: 'in_channel',
    text: s
  })
)

const onNoText = res => {
  res.statusCode = 400
  return res.json({
    errors: [{
      code: 1,
      message: 'You must send an acronym'
    }]
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
  app.use(express.json({ type: 'application/json' }))

  app.post('/wat', (req, res) => {
    if (!req.body || !req.body.text) {
      return onNoText(res)
    }

    if (!req.body || !req.body.token) {
      return onNoToken(res)
    }

    if (req.body.token !== slackVerificationToken) {
      return onWrongToken(res)
    }

    lookup.acronym(
      req.body.text,
      s => onKnown(s, res),
      s => onUnknown(s, res)
    )
  })

  return app
}
