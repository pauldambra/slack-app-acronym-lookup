const request = require('supertest')
const appFactory = require('../src/app-factory')

describe('the server', function () {
  let app

  beforeEach(function () {
    const lookup = require('../src/lookup')
    lookup.set({
      iib: 'woah',
      mdm: 'yass'
    })
    app = appFactory(1337, lookup, 'the token')
  })

  it('can respond with an error when tokens do not match', function (done) {
    request(app)
      .post('/wat')
      .send({ text: 'iib', token: 'not the token' })
      .expect(401, done)
  })
})
