const logger = require('heroku-logger')
const responseMapper = require('./response-mapper')

const onUnknown = (s, res) => {
  logger.info(`acronym not found: ${s}`)
  return res.json({
    response_type: 'ephemeral',
    text: `I don't know what ${s} means :(`
  })
}

const onKnown = (s, res) => {
  logger.info(`acronym found: ${s}`)
  return res.json(responseMapper.forKnownAcronym(s))
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

const ensureAcronymIsInRequest = (req, res, next) => {
  if (!req.body || !req.body.text) {
    logger.error(`there was no acronym in request in ${JSON.stringify(req.body)}`)
    return onNoText(res)
  } else {
    logger.info(`wat lookup received for ${req.body.text}`)
    next()
  }
}

const ensureTokenIsPresent = (req, res, next) => {
  if (!req.body || !req.body.token) {
    return onNoToken(res)
  } else {
    next()
  }
}

const ensureVerificationIsValid = slackVerificationToken => {
  return (req, res, next) => {
    if (req.body.token !== slackVerificationToken) {
      return onWrongToken(res)
    } else {
      next()
    }
  }
}

const sendHelpIfNeeded = (req, res, next) => {
  if (req.body.text === 'help') {
    res.json(responseMapper.forHelp())
  } else {
    next()
  }
}

const lookupAcronymUsing = lookup => {
  return (req, res) => {
    lookup.acronym(req.body.text)
      .then(s => onKnown(s, res))
      .catch(s => onUnknown(s, res))
  }
}

module.exports = {
  register: (app, lookup, slackVerificationToken) => {
    app.use('/wat', ensureAcronymIsInRequest)
    app.use('/wat', ensureTokenIsPresent)
    app.use('/wat', ensureVerificationIsValid(slackVerificationToken))

    app.post('/wat', sendHelpIfNeeded)
    app.post('/wat', lookupAcronymUsing(lookup))
  }
}
