var express = require('express')
var router = express.Router()
require('dotenv').config()
var pg = require('pg')
if (process.env.NODE_ENV === 'production') pg.defaults.ssl = true
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: 'knex,public'
})

// Create a new poem
router.post('/', function(req, res) {
  knex('poems')
  .insert( { lines: [req.body.line] } )
  .catch(function(e){
    console.log(e)
    res.sendStatus(500)
  })
  .then(function(victory) {
    console.log('new', {line: req.body.line})
    console.log('victory', victory)
    res.sendStatus(200)
  })
})

// Updating poems
router.put('/:id', function(req, res) {
  var completed = req.body.completed || false
  var endtime = null
  // Cast the current time to seconds
  if(completed) endtime = knex.raw('(extract(epoch from now()) * 1000)')
  console.log(req.params.id, req.body)
  knex('poems')
  .update({
      lines: knex.raw('array_append(lines, ?)', req.body.line),
      completed: completed,
      endtime: endtime
  })
  .where({
    id: req.params.id
  })
  .catch(function(e){
    console.log(e)
    res.sendStatus(500)
  })
  .then(function(victory) {
    console.log('victory', victory)
    res.sendStatus(200)
  })
})



router.get('/random', function(req, res) {
  knex('poems')
  .select('*')
  .where({ completed: 'false' })
  .then(function(rows){
    var randomPoem = rows[Math.floor(Math.random() * rows.length)]
    console.log('Returned random: ',randomPoem.id)
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

router.get('/:id', function(req, res) {
  knex('poems')
  .select('*')
  .where({id: req.params.id})
  .then(function(poem) {
    console.log('Returned poem', poem.id)
    res.send(poem)
  })
})

module.exports = router
