const  Product = require('../models/product');
const Cart = require('../models/cart');


//Index-Shop
exports.getIndex = (req,res,next)=> {
    Product.findAll()
    .then( data => {
        res.render('shop/index',{pageTitle:'Shop', path:'/', prods: data});
    })
    .catch( err => {
        console.log(err)
    });
}

//Cart Shop
exports.getCart = (req,res,next) => {
    Cart.getCart((cart) => {
        Product.fetchAll( products => {
            const cartProducts = [];
            for(product of products){
                console.log(products)
                const cartProductData = cart.products.find( prod => prod.id === product.id); 
                console.log(cartProductData);
                if(cartProductData){
                    cartProducts.push({productData: product, qty:cartProductData.qty});
                }
            }
            res.render('shop/cart',{pageTitle:'Cart Shop', path:'/cart', products: cartProducts});
        })
    })
}

//send product to Cart
exports.postCart = (req,res,next) => {
    const prodId = req.body.productId;

    Product.findById(prodId, (product) => {
        Cart.addProduct( prodId, product.price);
    })
    res.redirect('/cart');
}

exports.postCartDelete = (req,res,next) => {
    const prodId =  req.body.productId;
    Product.findById(prodId , product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart')
    })
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

    Product.findAll()
    .then( data => {
        res.render('shop/product-list',{prods: data, pageTitle: 'product-list', path:'/products'})
    })
    .catch( err => {
        console.log(err)
    });

}

//Product
exports.getProduct = (req,res,next) => {   
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then( product => {
            res.render('shop/product-detail',{product: product.dataValues, pageTitle: 'Edit Product', path:'/products'})
        })
        .catch( err => {
            console.log(err)
        });
}