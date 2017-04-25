var app = require ('../index'),
    supertest = require('supertest')(app),
    chai = require('chai'),
    expect = chai.expect

describe('The index page', function() {
  it('responds to GET at / with hello world', function(done) {
    supertest.get('/')
    .expect(200, 'Hello, world.')
    .end(done)
  })
})
