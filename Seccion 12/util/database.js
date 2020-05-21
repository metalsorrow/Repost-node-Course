// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient;

// const mongoConnect = ( cb) => {
    
//     MongoClient.connect('mongodb+srv://admindb:cvTJwRRnAVN9eVNM@nodecourse-8luun.mongodb.net/test?retryWrites=true&w=majority')
//     .then( res => {
//         console.log('DB Connected!')
//         cb(res)
//     })
//     .catch( err => {
//         console.log(err)
//         cb(err)
//     })
// }


// module.exports = mongoConnect;

const MongoClient = require('mongodb').MongoClient;
const mongoConnect = ( cb ) => {
    const uri = "mongodb+srv://admindb:cvTJwRRnAVN9eVNM@nodecourse-8luun.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true });
    
    client.connect()
    .then( res => {
        cb(res)
    })
    .catch( err => {
        cb(err)
    })
}

module.exports = mongoConnect;
