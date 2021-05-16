const MongoClient = require('mongodb').MongoClient;

let _db;

const mongoConnect = ( cb ) => {
    const uri = "mongodb+srv://Tauz:cehRKYIxPX6gTbxp@cluster0.pnipy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true });
    
    client.connect()
        .then( res => {
            console.log('Connected!')
            _db = client.db()
            cb();
        })
        .catch( err => {
            console.log(err);
            throw err;
        })
}

const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No database found!';
}

module.exports = {mongoConnect,getDb};
