
module.exports = {
  forKnownAcronym: s => {
    const m = {
      response_type: 'in_channel',
      text: s.name
    }
    if (s.description && s.description.length > 0) {
      m.attachments = s.description.map(d => ({text: d}))
    }
    return m
  },
  forHelp: () => {
    const m = {
      response_type: 'in_channel',
      text: `the ubictionary lets you check what an acronym or name means`
    }

    m.attachments = [
      {text: `try /wat iib or /wat mdm`}
    ]

    return m
  }
}
