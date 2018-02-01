const chai = require('chai')
const expect = chai.expect
const lookup = require('../src/lookup')

describe('looking up acronyms', function () {
  it('can find a known one', function (done) {
    lookup.set({
      iib: 'IBM information bus'
    })
    lookup.acronym(
      'iib',
      s => expect(s).to.equal('IBM information bus'),
      done)
    done()
  })

  it('can handle acronyms with spaces', function (done) {
    lookup.set({
      'iib iib': 'something'
    })
    lookup.acronym(
      'iib iib',
      s => expect(s).to.equal('something'),
      done)
    done()
  })

  it('can handle an unknown one', function (done) {
    let called = false
    lookup.acronym(
      'jknasfaj',
      done,
      s => (called = true))
    expect(called).to.equal(true)
    done()
  })
})
