const request = require('supertest')
const appFactory = require('../src/app-factory')
const chai = require('chai')
const expect = chai.expect

describe('acronym descriptions', function () {
  let app

  beforeEach(function () {
    const lookup = require('../src/lookup')
    lookup.set({
      iib: {name: 'woah'},
      mdm: {name: 'yass', description: ['a', 'b']}
    })
    app = appFactory(1337, lookup, 'test')
  })

  it('can be returned from the server', function (done) {
    request(app)
      .post('/wat')
      .send('text=mdm')
      .send('token=test')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err)
        }
        expect(res.body).to.eql(
          {
            'response_type': 'in_channel',
            'text': `yass`,
            'attachments': [
              {'text': 'a'},
              {'text': 'b'}
            ]
          })
        done()
      })
  })
})
