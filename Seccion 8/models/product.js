const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

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
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        this.id = Math.random().toString();
        console.log(this.id)
        getProductsFromFile( products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err, res) => {
                if(err){
                    return console.log(err, "error in readFileSave")
                }
                
                console.log("Ok")
            });
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