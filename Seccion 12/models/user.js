const getDb  = require('../util/database').getDb
const mongodb = require('mongodb')

// const ObjectId = mongodb.ObjectId;

// class User {
//     constructor(name, email, cart,id){
//         this.name = name;
//         this.email = email;
//         this.cart = cart;
//         this._id = id
//     }

//     save(){
//         return getDb().collection('users').insertOne(this)
//     }

//     addToCart(product){    
//         const cartProductIndex = this.cart.items.findIndex( cp => {
//             return cp.productId.toString() === product._id.toString();
//         });

//         let newQuantity = 1;
//         const updatedCartItems = [...this.cart.items];

//         if(cartProductIndex >= 0){
//             newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//             updatedCartItems[cartProductIndex].quantity = newQuantity;
//         } else {
//             updatedCartItems.push({productId: new ObjectId(product._id), quantity: newQuantity})
//         }
//         const updateCart = {
//             items: updatedCartItems
//         }

//         return getDb()
//             .collection('users')
//             .updateOne({_id: new ObjectId(this._id)}, {$set: { cart: updateCart }})    
//     }

//     getCart(){
//         const db = getDb();
//         const productIds = this.cart.items.map( i => i.productId );
//         return db.collection('products')
//             .find({ _id: {$in: productIds }})
//             .toArray()
//             .then( products => {
//                 return products.map( p => {
//                     return{...p, quantity: this.cart.items.find( i => {
//                         return i.productId.toString() === p._id.toString();
//                     }).quantity}
//                 });
//             })
//     }

//     deleteFromCart(productId){
//         const db = getDb();
        
//         const updatedCartItems = this.cart.items.filter( item => item.productId.toString() !== productId.toString());

//         return getDb()
//             .collection('users')
//             .updateOne({_id: new ObjectId(this._id)}, {$set: { cart: { items: updatedCartItems} }})  
//     }

//     addOrder(){
//         const db = getDb();
//         return this.getCart().then(products => {
//             const order = {
//                 items: products,
//                 user: {
//                     _id: new ObjectId(this._id),
//                     name: this.name
//                 }
//             }

//             return db.collection('orders')
//             .insertOne(order)
//             .then( result => {
//                 this.cart = {items: []}
//                 return db 
//                     .collection('users')
//                     .updateOne(
//                         { _id: new ObjectId(this._id) },
//                         { $set: { cart: { items: [] }}}
//                     )

//             });
//         })
//     }

//     getOrders(){
//         const db = getDb();
//         return db
//             .collection('orders')
//             .find({'user._id': new ObjectId(this._id)})
//             .toArray();
//     }

//     static findById(userId){    
//         return getDb().collection('users').findOne( {_id: new ObjectId(userId)})
//     }
// }



module.exports = User;