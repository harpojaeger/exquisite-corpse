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

// Create a new poem
router.post('/', function(req, res) {
  console.log(req.body)
  //knex('poems')
  res.send(null)
})

// Updating poems
router.put('/', function(req, res) {
  knex('poems')
  .update({
      colName: knex.raw('array_append(colName, ?)', ['cats'])
  })
})


router.get('/random', function(req, res) {
  knex('poems')
  .select('*')
  .where({ completed: 'false' })
  .then(function(rows){
    var randomPoem = rows[Math.floor(Math.random() * rows.length)]
    console.log('Returned poem',randomPoem.id)
    res.send(randomPoem)
  })
})
router.get('/completed', function(req, res) {
  knex('poems')
  .select('*')
  .where({ completed: 'true' })
  .orderBy('id', 'desc')
  .then(function(rows){
    console.log('Returned',rows.length,'completed poems')
    res.send(rows)
  })
})

module.exports = router
