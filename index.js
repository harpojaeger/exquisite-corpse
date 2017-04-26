var express = require('express')
   ,app = express()
   ,bodyParser = require('body-parser')
   ,port = process.env.PORT || 5000
require('dotenv').config()

app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/favicon.ico', function(req, res) {
  res.send(null)
})

app.get('/', function(req, res) {
  res.send('Hello, world.')
})

var fetchPoem = require('./routes/fetchPoem')
app.use('/poem', fetchPoem)


app.listen(port, function() {
  console.log('Node app is running on port',port)
})

module.exports = app
