const  Product = require('../models/product');
const Cart = require('../models/cart');


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

//send product to Cart
exports.postCart = (req,res,next) => {
    const prodId = req.body.productId;

    Product.findById(prodId, (product) => {
        Cart.addProduct( prodId, product.price);
    })
    res.render("shop/cart",{pageTitle: "My Cart",path:"/cart"});
}

//Orders
exports.getOrders = (req,res,next) => {
    res.render('shop/orders',{pageTitle:'Your Orders', path:'/orders'})
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

//Product
exports.getProduct = (req,res,next) => {   
    const prodId = req.params.productId;

    Product.findById( prodId , (product)=>{
        res.render('shop/product-detail',{product: product, pageTitle: 'Edit Product', path:'/products'})
    });
}