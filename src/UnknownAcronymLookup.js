
module.exports = class UnknownAcronymLookup extends Error {
  constructor (acronym, ...args) {
    super(...args)
    this.acronym = acronym
    Error.captureStackTrace(this, UnknownAcronymLookup)
  }
}
