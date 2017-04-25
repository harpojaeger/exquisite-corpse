var express = require('express')
var router = express.Router()
require('dotenv').config()
var pg = require('pg')
pg.defaults.ssl = true
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: 'knex,public'
})
var poems = [
  {
    poemId: 391,
    startTime: 1493151989,
    lines: [
      'The country mice bring their straw banjos',
      'and play a cool rendition of "For Your Love"',
      'by Jenton Jenkins at 1945',
      'Main Street, Anytown, USA',
      'Zielona Gora, lubuskie, Poland',
      'plots and land for sale',
      'anymore'
    ],
    completed: true
  },
  {
    poemId: 390,
    lines: [
      'I HAD A TICKET!',
      'But not anymore.',
      'It ends now.',
      'holy cow',
      'put on the crown.',
    ],
    completed: false,
  },
  {
    poemId: 439,
    startTime: 1493151989,
    endTime: 1493150989,
    lines: [
      "There's an eight ball, a seven ball. Then, there's you.",
      "It could've been you",
      "complaisant angelic waves swaying amogst stars",
      "never saw the attractive black hole drawing closer",
      "the light lost, lost his mind",
      "as it had accidentally rolled under the couch"
    ],
    completed: true,
  }
]

router.get('/random', function(req, res) {
  res.send(poems[0])
})
router.get('/completed', function(req, res) {
  res.send(poems)
})

module.exports = router
