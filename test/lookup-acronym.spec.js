const chai = require('chai')
const expect = chai.expect
const lookup = require('../src/lookup')

describe('looking up acronyms', function () {
  it('can find a known one', function (done) {
    lookup.set({
      iib: {name: 'IBM information bus'}
    })

    lookup.acronym('iib')
      .then(s => {
        expect(s.name).to.equal('IBM information bus')
        done()
      })
      .catch(done)
  })

  it('can have descriptions', function (done) {
    lookup.set({
      iib: {
        name: 'IBM information bus',
        description: [
          'one line of text',
          'and another'
        ]
      }
    })

    lookup.acronym('iib')
      .then(s => {
        expect(s.description).to.deep.equal([
          'one line of text',
          'and another'
        ])
        done()
      })
      .catch(done)
  })

  it('can handle acronyms with spaces', function (done) {
    lookup.set({
      'iib iib': {name: 'something'}
    })

    lookup.acronym('iib iib')
      .then(s => {
        expect(s.name).to.equal('something')
        done()
      })
      .catch(done)
  })

  it('can handle an unknown one', function (done) {
    lookup.acronym('jknasfaj')
      .then(done)
      .catch(err => {
        expect(err).to.exist
          .and.be.instanceof(Error)
          .and.have.property('message', 'could not find acronym jknasfaj')
        done()
      })
  })
})
