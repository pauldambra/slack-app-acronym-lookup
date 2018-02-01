
let ubictionary = {}

module.exports = {
  set: u => (ubictionary = u),
  acronym: (s, whenFound, whenUnknown) => {
    const found = ubictionary[s]
    if (found) {
      whenFound(found)
    } else {
      whenUnknown(s)
    }
  }
}
