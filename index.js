var express = require('express')
   ,app = express()
   ,bodyParser = require('body-parser')
   ,port = process.env.PORT || 5000
require('dotenv').config()

app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({
  extended: true
}))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

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
