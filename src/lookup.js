const UnknownAcronymLookup = require('./UnknownAcronymLookup.js')
let ubictionary = {}

module.exports = {
  set: u => (ubictionary = u),
  acronym: (s) => {
    const found = ubictionary[s]
    return new Promise((resolve, reject) => {
      if (found) {
        resolve(found)
      } else {
        reject(new UnknownAcronymLookup(s, `could not find acronym ${s}`))
      }
    })
  }
}
