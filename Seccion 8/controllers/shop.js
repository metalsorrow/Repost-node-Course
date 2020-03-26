const  Product = require('../models/product');


//Index-Shop
exports.getIndex = (req,res,next)=> {
    Product.fetchAll((products)=>{
        res.render('shop/index',{prods: products, pageTitle: 'Shop Chop', path:'/'})
    });
}

//Cart Shop
exports.getCart = (req,res,next) => {
    res.render('shop/cart',{pageTitle:'Cart Shop', path:'/cart'})
}

//CheckOut
exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout',{pageTitle:'CheckOut', path:'/checkout'})
}

//Products list
exports.getProducts = (req,res,next) => {   
    Product.fetchAll((products)=>{
        res.render('shop/product-list',{prods: products, pageTitle: 'product-list', path:'/products'})
    });
}