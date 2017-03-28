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

            col.findOne({}, function(err, doc) {
                if (doc == null) {
                    console.log('can not read value')
                    col.insertOne({ 'name': name, 'num': 0 })
                    db.close()
                    resp(null, 0)
                    return
                }

                let lastId = doc.num + 1
                col.updateOne({ 'name': name }, { 'num': lastId }, function(err) {
                    db.close()
                    resp(null, lastId)
                })
            })
        })
    })
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

exports.MGLastOne = mg_get_last_one