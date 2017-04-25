var app = require ('../index'),
    supertest = require('supertest')(app),
    chai = require('chai'),
    expect = chai.expect
chai.use(require('chai-json-schema'))
require('./index')

// This schema will work for both completed & uncompleted poems
var poemSchema = {
      title: 'poem schema',
      type: 'object',
      properties: {
        poemId: { type: 'integer' },
        startTime: { type: 'integer' },
        endTime: { type: 'integer' },
        lines: { type: 'array' },
        completed: {type: 'boolean' },
      },
      required: [ 'poemId', 'lines', 'completed' ]
    }

describe('The poem fetcher', function() {
  it('returns a random uncompleted poem at /poem/random', function(done) {
    supertest.get('/poem/random')
    .expect(200, function(err, res) {
      expect(JSON.parse(res.text)).to.be.jsonSchema(poemSchema)
      done()
    })
  })

  it('returns a list of completed poems at /poem/completed', function(done) {
    supertest.get('/poem/completed')
    .expect(200, function(err, res) {
      var completedPoems = JSON.parse(res.text)
      completedPoems.forEach( (poem) =>
        expect(poem).to.be.jsonSchema(poemSchema)
      )
      done()
    })
  })
})
