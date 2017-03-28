var mg = require('./mglastone')

mg.MGConfig('mongodb://localhost:1700/MGLastOne')
mg.MGLastOneAsync('test2')
    .then(function(m) {
        console.log(m)
        return mg.MGLastOneAsync('test2')
    })
    .then(function(m) {
        console.log(m)
        return mg.MGLastOneAsync('test2')
    })
    .then(function(m) {
        console.log(m)
    })
    .catch(function(error) {
        console.log(error)
    })