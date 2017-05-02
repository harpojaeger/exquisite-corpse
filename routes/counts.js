var express = require('express')
var router = express.Router()
require('dotenv').config()
var pg = require('pg')
//pg.defaults.ssl = true
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: 'knex,public'
})

router.get('/completed', function(req, res) {
  knex('poems')
  .count('id')
  .where({completed: true})
  .then( (obj) => {
    res.send(obj[0].count)
  })
})

router.get('/uncompleted', function(req, res) {
  knex('poems')
  .count('id')
  .where({completed: false})
  .then( (obj) => {
    res.send(obj[0].count)
  })
})

module.exports = router
