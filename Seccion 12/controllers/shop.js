const Product = require('../models/product');
const Order = require('../models/order') 


//Index-Shop
exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then(data => {
            res.render('shop/index', { pageTitle: 'Shop', path: '/', prods: data });
        })
        .catch(err => {
            console.log(err)
        });
}

//Cart Shop
exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts()
        })
        .then(products => {
            console.log(products)
            res.render('shop/cart', { pageTitle: 'Cart Shop', path: '/cart', products: products });
        })
        .catch(err => {
            console.log(err)
        })
}

//send product to Cart
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchCart;
    let newQuantity = 1;

    req.user
        .getCart()
        .then(cart => {
            fetchCart = cart;
            return cart.getProducts({ where: { id: prodId } })
        })
        .then(products => {
            let product;

            if (products.length > 0) {
                product = products[0];
            }
            if (product) {
                const oldQuantity = product.cartItems.quantity;
                newQuantity = oldQuantity + 1;
                return product
            }
            return Product.findByPk(prodId)
        })
        .then( product => {
            return fetchCart.addProduct(product,{ through: { quantity: newQuantity }})
        })
        .then( () => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err)
        })

}

exports.postCartDelete = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .getCart()
        .then( cart => {
            return cart.getProducts({where: {id: prodId}});
        })
        .then( products => {
            const prod = products[0];
            return prod.cartItems.destroy();
        })
        .then( result => {
            res.redirect('/cart')
        })
        .catch( err => {
            console.log(err)
        })
}

//Orders
exports.getOrder = (req, res, next) => {
    //This works only if you have the relation between this 2 entities
    req.user.getOrders({include: ['products']})
    .then( orders => {
        console.log(orders)
        res.render('shop/orders', { pageTitle: 'Your Orders', path: '/orders', orders })

    })
    .catch(err => {
        console.log(err)
    })
}

//PostOrder
exports.postOrder = (req,res,next) => {
    let fetchCart;
    req.user.getCart()
    .then( cart => {
        fetchCart = cart;
        return cart.getProducts();
    })
    .then( products => {
        return req.user.createOrder()
        .then( order => {
            order.addProducts(products.map( product => {
                product.orderItem = { quantity: product.cartItems.quantity   };
                return product;
            }))
        })
    })
    .then( result => {
        return fetchCart.setProducts(null);
    })
    .then(() => {
        res.redirect('/orders')
        
    })
    .catch(err => {
        console.log(err)
    })
}

// 
// exports.getOrders

//CheckOut
exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { pageTitle: 'CheckOut', path: '/checkout' })
}


//Products list
exports.getProducts = (req, res, next) => {

    Product.findAll()
        .then(data => {
            res.render('shop/product-list', { prods: data, pageTitle: 'product-list', path: '/products' })
        })
        .catch(err => {
            console.log(err)
        });

}

//Product
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(product => {
            res.render('shop/product-detail', { product: product.dataValues, pageTitle: 'Edit Product', path: '/products' })
        })
        .catch(err => {
            console.log(err)
        });
}