var express = require('express')
   ,app = express()
   ,bodyParser = require('body-parser')
   ,cors = require('cors')
   ,port = process.env.PORT || 5000
require('dotenv').config()

app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(cors())
//Enable CORS for PUT (a non-standard verb)
app.options('*', cors())

app.get('/favicon.ico', function(req, res) {
  res.send(null)
})

app.get('/', function(req, res) {
  res.send('Hello, world.')
})

var poems = require('./routes/poems')
app.use('/poems', poems)


app.listen(port, function() {
  console.log('Node app is running on port',port)
})

module.exports = app
