const fs = require('fs');
const path = require('path');



const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'    
);

module.exports = class Cart {
    static addProduct(id, productPrice){
        // Fetch the previous cart}
        fs.readFile(p, (err, data)=> {
            let cart = {products: [], totalPrice: 0};
            if(!err){
                cart = JSON.parse(data);
            }
            // Analyze the cart => Find existing product

            const existingProductIndex = cart.products.findIndex( product => product.id === id)
            const existingProduct = cart.products[existingProductIndex];
            console.log(existingProductIndex)
            
            // Add new product/ increase quantity
            let updateProduct;
            if(existingProduct){
                //En el caso de que ya exista el producto
                updateProduct = {...existingProduct}
                updateProduct.qty = updateProduct.qty + 1;
                cart.products[existingProductIndex] = updateProduct;
            } else {
                //En el caso de que sea un nuevo producto no registrado
                updateProduct = {id, qty: 1};
                cart.products = [ ...cart.products,updateProduct];
            }

            cart.totalPrice = cart.totalPrice = cart.totalPrice + +productPrice;

            fs.writeFile(p, JSON.stringify(cart), err =>{
                    console.log(err, "error")
            });

        })
    }

    static deleteProduct(id, productPrice){
        fs.readFile(p, (err, data) => {
            if(err){
                console.log(err, "err")
                return;
            }

            const cart = JSON.parse(data);

            const updatedCart = { ...cart};
            const product = updatedCart.products.find( prod => prod.id === id);
            if(product){
                console.log(product)
                const productQty = product.qty;
                
                updatedCart.products = updatedCart.products.filter( prod => prod.id !== id)

                updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
    
                fs.writeFile(p, JSON.stringify(updatedCart), err =>{
                    console.log(err, "error")
                });
            }else {
                return;

            }

        })
    }

    static getCart(cb){
        fs.readFile(p, (err, data) => {
            const cart = JSON.parse(data);
            if(err){
                cb(null)
            }else {
                cb(cart)
            }
        })
    }

}