const getDb = require('../util/database').getDb;
const mongodb = require('mongodb')

// class Product {
//     constructor(title, price, description, imageUrl, id, userId){
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this._id = id ? new mongodb.ObjectId(id) : null;
//         this.userId = userId;
//     }

//     save(){
//         const db = getDb();
//         let dbOp;

//         if ( this._id){
//             // Update the product
//             dbOp= db
//                 .collection('products')
//                 .findOneAndUpdate({  _id: this._id}, {$set: this});
//         } else {
//             dbOp = db.collection('products').insertOne(this);
//         }
//         return dbOp
//             .then( res => {
//                 console.log('Product saved')
//             })
//             .catch( err => {
//                 console.log(err)
//             });
//     }

//     static editProduct(product){
//         const db = getDb();
//         return db.collection('products')
//             .findOneAndUpdate({_id: new mongodb.ObjectID(product.productId)},
//             {$set: {title: product.title, imageUrl: product.imageUrl, price: product.price, description: product.description}})
//             .then(res => {
//                 console.log('product modified')
//             })
//             .catch( err => {
//                 console.log(err)
//             })
//     }

//     static fetchAll(){
//         const db = getDb(); 

//         return db
//             .collection('products')
//             .find()
//             .toArray()
//             .then( products => {
//                 return products;
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }

//     static findById(prodId){
//         const db = getDb();
//         return db
//             .collection('products')
//             .find({ _id: new mongodb.ObjectId(prodId)})
//             .next()
//             .then( product => {
//                 return product
//             })
//             .catch( err => {
//                 console.log(err)
//             })
//     }

//     static deleteById(prodId){
//         const db = getDb();
//         return db.collection('products')
//             .findOneAndDelete({ _id: new mongodb.ObjectID(prodId) })
//             .then( res => {
//                 console.log('product deleted')
//                 return res;
//             })
//             .catch( err => {
//                 console.log(err);
//             })
//     }

// }
module.exports = Product;