var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:1600/MGLastOne'

function mg_get_last_one(name, resp) {
    MongoClient.connect(url, function(err, db) {
        if (err != null) {
            console.log('can not connect to database')
            resp(err, null)
            return
        }

        db.collection('MGLastOne', function(err, col) {
            if (err != null) {
                console.log('can not get collection')
                resp(err, null)
                db.close()
                return
            }

            col.findOne({ 'name': name }, function(err, doc) {
                if (doc == null) {
                    console.log('can not read value')
                    col.insertOne({ 'name': name, 'num': 0 })
                    db.close()
                    resp(null, 0)
                    return
                }

                let lastId = doc.num + 1
                col.updateOne({ 'name': name }, { 'name': name, 'num': lastId }, function(err) {
                    db.close()
                    resp(null, lastId)
                })
            })
        })
    })
}

exports.MGConfig = function(mongo_url) {
    url = mongo_url
}

exports.MGLastOneAsync = function(name) {
    return new Promise(function(resolve, reject) {
        mg_get_last_one(name, function(error, num) {
            if (error != null) {
                reject(error)
            } else {
                resolve(num)
            }
        })
    })
}

function mg_set_value(name, value, resp) {
    MongoClient.connect(url, function(err, db) {
        if (err != null) {
            console.log('can not connect to database')
            resp(err, null)
            return
        }

        db.collection('MGLastOne', function(err, col) {
            if (err != null) {
                console.log('can not get collection')
                resp(err, null)
                db.close()
                return
            }

            col.updateOne({ 'name': name }, { 'name': name, 'num': value }, function(err) {
                db.close()
                resp(null, value)
            })
        })
    })
}

exports.MGSetValueAsync = function(name, value) {
    return new Promise(function(resolve, reject) {
        mg_set_value(name, value, function(err, num) {
            if (err != null) {
                reject(error)
            } else {
                resolve(num)
            }
        })
    })
}

exports.MGLastOne = mg_get_last_one
exports.MGSetValue = mg_set_value