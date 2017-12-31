var axios = require('axios')

function completed() {
  return axios.get('/poems/completed')
    .then(function(poems) {
      return poems.data
    })
}

function random() {
  return axios.get('/poems/random')
    .then(function(poem) {
      return poem.data
    })
}

function nextline(id, line, completed) {
  return axios.put('/poems/'+id,
  {
    line: line,
    completed: completed,
  })
  .then(function(res) {
    return res
  })
  .catch(function (e) {
    console.error(e)
    return e
  })
}

function newpoem(line) {
  return axios.post('/poems',
    {
      line: line
    }
  )
  .then(function(res) {
    return res
  })
  .catch(function (e) {
    console.error(e)
    return e
  })
}

function countCompleted() {
  return axios.get('/counts/completed')
  .then(function(res) {
    return res.data
  })
  .catch( function(e) {
    console.error(e)
    return e
  })
}

function countUncompleted() {
  return axios.get('/counts/uncompleted')
  .then(function(res) {
    return res.data
  })
  .catch( function(e) {
    console.error(e)
    return e
  })
}

module.exports = {
  random: random,
  completed: completed,
  nextline: nextline,
  newpoem: newpoem,
  countUncompleted: countUncompleted,
  countCompleted: countCompleted,
}
