var express = require('express')
   ,app = express()
   ,bodyParser = require('body-parser')
app.use( bodyParser.json() )       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))
require('dotenv').config()
var port = process.env.PORT || 5000

app.get('/favicon.ico', function(req, res) {
  res.send(null)
})

app.get('/', function(req, res) {
  res.send('Hello, world.')
})

module.exports = app
