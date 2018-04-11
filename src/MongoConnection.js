let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/cryptoCurrency";
MongoClient.connect(url, function(err,db){
    if(err) throw err;
    console.log("cryptoCurrency Database created")
    db.close();
})

