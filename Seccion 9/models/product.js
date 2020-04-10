const fs = require('fs');
const path = require('path');

const Cart = require('./cart')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

//Simpre devuelve un array
const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, data) => {
        if (err) {
           cb([])
        } else {
            cb(JSON.parse(data));
        }
    });
}

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        getProductsFromFile( products => {
            if(this.id){
                const existingProductIndex = products.findIndex(prod => prod.id ===  this.id);

                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                
                fs.writeFile(p, JSON.stringify(updatedProducts), (err, res) => {
                    if(err){
                        return console.log(err, "error in readFileSave")
                    }
                    console.log("Ok update")
                });

            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err, res) => {
                    if(err){
                        return console.log(err, "error in readFileSave")
                    }
                    
                    console.log("Ok save")
                });
            }
        })
    }

    static deleteById(id){
        getProductsFromFile( products => {
            const productDelete = products.find( prod => prod.id === id);
            const productsFiltered = products.filter( prod => prod.id !== id);

            fs.writeFile(p,JSON.stringify(productsFiltered), (err, res) => {
                if(err){
                    return console.log(err, "error in readFileSave")
                }

                Cart.deleteProduct(id, productDelete.price)
                console.log("Ok Deleted")
            
            })
        })    
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id,cb) {
        getProductsFromFile(products => {
            const product = products.find( element => element.id === id );
            cb(product);
        });
    }
}