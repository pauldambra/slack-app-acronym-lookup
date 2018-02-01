
module.exports = {
  mapKnown: s => {
    const m = {
      response_type: 'in_channel',
      text: s.name
    }
    if (s.description && s.description.length > 0) {
      m.attachments = s.description.map(d => ({text: d}))
    }
    return m
  }
}
