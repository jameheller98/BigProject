var mongoClient = require("mongodb").MongoClient;

mongoClient.connect("mongodb://127.0.0.1:27017/ ", function(err,db){
    if(err) throw err;
    console.log("Ket noi thanh cong");
    var dbase = db.db("MongoData");
    var collection = dbase.collection('users');
    var user1 = {name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']};
    collection.insert([user1], function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
      }
    });
    db.close();
});
