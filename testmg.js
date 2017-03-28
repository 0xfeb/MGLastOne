var mg = require('./mglastone')

mg.MGLastOneAsync('test')
    .then(function(m) {
        console.log(m)
        return mg.MGLastOneAsync('test')
    })
    .then(function(m) {
        console.log(m)
        return mg.MGLastOneAsync('test')
    })
    .then(function(m) {
        console.log(m)
    })
    .catch(function(error) {
        console.log(error)
    })