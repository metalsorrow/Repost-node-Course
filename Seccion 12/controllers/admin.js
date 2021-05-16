const Product = require('../models/product');
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

//Admin Add Product View
exports. getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    })
}

//Admin Add Product
exports.postAddProduct = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body;
    const product = new Product(title, price, description,imageUrl, null,req.user._id )
    product.save()
    .then( () => {
        res.redirect('/admin/products')
    })
    .catch( err => {
        console.log(err) 
    })
}

//Admin Products list View
exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('admin/product-list', { prods: products, pageTitle: 'Admin Products', path: '/admin/products' })
        })
        .catch( err => {
            console.log(err)
        })
}

//Edit Product View
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const productId = req.params.productId;
    if (!editMode) {
        return res.redirect('/');
    }
    Product.findById(productId)
        .then( resDb => {
            if (!resDb) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                product: resDb,
                pageTitle: 'Edite Product',
                path: "/admin/edit-product",
                editing: editMode
            })

        })
        .catch( err => {
            console.log(err)
        })
}

// //Edit Product
exports.postEditProduct = (req, res, next) => {
    const { productId, title, imageUrl, price, description } = req.body;
    const product = new Product(title,price,description,imageUrl, new ObjectId(productId));
    console.log(product);
    product.save()
    .then( result => {
        res.redirect('/admin/products')
    });
}


//Delete Product
exports.postDeleteProduct = (req, res, next) => {
    const { productId } = req.body;
    Product.deleteProductById(productId)
        .then( resDb => {
            res.redirect('/admin/products');
        })
        .catch( res => console.log(err))}