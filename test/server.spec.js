const request = require('supertest')
const appFactory = require('../src/app-factory')
const chai = require('chai')
const expect = chai.expect

describe('the server', function () {
  let app

  beforeEach(function () {
    const lookup = require('../src/lookup')
    lookup.set({
      iib: 'woah',
      mdm: 'yass'
    })
    app = appFactory(1337, lookup, 'test')
  })

  it('can respond to a lookup for iib', function (done) {
    request(app)
      .post('/wat')
      .send({ text: 'iib', token: 'test' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err)
        }
        expect(res.body).to.eql(
          {
            'response_type': 'in_channel',
            'text': `woah`
          })
        done()
      })
  })

  it('can respond to a lookup for mdm', function (done) {
    request(app)
      .post('/wat')
      .send({ text: 'mdm', token: 'test' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err)
        }
        expect(res.body).to.eql(
          {
            'response_type': 'in_channel',
            'text': `yass`
          })
        done()
      })
  })

  it('can error if you do not send text', function (done) {
    request(app)
      .post('/wat')
      .send({token: 'test'})
      .expect('Content-Type', /json/)
      .expect(400, done)
  })

  it('can error if you do not send a token', function (done) {
    request(app)
      .post('/wat')
      .send({text: 'present'})
      .expect('Content-Type', /json/)
      .expect(400, done)
  })
})
