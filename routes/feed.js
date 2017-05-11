const express = require('express')
const router = express.Router()
require('dotenv').config()
const pg = require('pg')
if (process.env.NODE_ENV === 'production') pg.defaults.ssl = true
const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: 'knex,public'
})
const port = process.env.port || 5000
const NodeCache = require('node-cache')
const rss_cache = new NodeCache()
const axios = require('axios')
const async = require('async')
const RSS = require('rss')

router.get('/completed', function(req,res) {
  async.waterfall([
    function(cb) {
      rss_cache.get('poems', (err, value) => {
        if (!err) {
          if(value == undefined) {
            axios.get('http://localhost:' + port + '/poems/completed')
            .then( (poems) => {
              rss_cache.set( 'poems', poems.data, 600, function( err, success ){
                if( !err && success ){
                  console.log('rss: returning fresh poem data')
                  cb(null, poems.data)
                } else {
                  cb(err)
                }
              })
            })
          } else {
            console.log('rss: returning cached poem data')
            cb(null, value)
          }
        } else {
          cb(err)
        }
      })
    },
    function(poems, cb) {
      poems.sort( (a, b) => {
        return a.id - b.id
      })
      cb(null, poems)
    },
    function(poems, cb) {
      const feedOptions = {
        title: 'exquisitecorpse.io completed poems',
        feed_url: 'http://exquisitecorpse.io/feed/completed',
        site_url: 'http://exquisitecorpse.io',
        type: 'application/xml'
      }
      const feed = new RSS(feedOptions)
      poems.forEach( (poem) => {
        var itemOptions = {
          title: 'Poem #' + poem.id,
          description: poem.lines.reduce( (acc, val) => {
          return acc + '<br>' + val
          }),
          url: 'http://exquisitecorpse.io#' + poem.id,
          guid: poem.id,
          author: 'exquisitecorpse',
          date: poem.endtime,
        }
        feed.item(itemOptions)
      })
      var xml = feed.xml({indent: true})
      cb(null, xml)
    }

  ], function(err, results) {
    if(err) {
      console.error(err)
      res.sendStatus(500)
    } else {
      res.send(results)
    }
  })
})

module.exports = router
