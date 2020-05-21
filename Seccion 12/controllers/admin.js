const Product = require('../models/product');


//Admin Add Product View
exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    })
}

//Admin Add Product
exports.postAddProduct = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body;
    req.user.createProduct( {
        title,
        imageUrl,
        price,
        description,
    })
    .then( () => {
        res.redirect('/admin/products')
    })
    .catch( err => {
        console.log(err)
    })
}

//Admin Products list View
exports.getAdminProducts = (req, res, next) => {
    req.user.getProducts()
        .then(resDb => {
            res.render('admin/product-list', { prods: resDb, pageTitle: 'Admin Products', path: '/admin/products' })
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
    // console.log(req.user)
    req.user.getProducts({where: {id: productId}})
        .then( resDb => {
            if (!resDb) {
                return res.redirect('/');
            }
            console.log(resDb, "DB")
            res.render('admin/edit-product', {
                product: resDb[0].dataValues,
                pageTitle: 'Edite Product',
                path: "/admin/edit-product",
                editing: editMode
            })

        })
        .catch( err => {
            console.log(err)
        })
}

//Edit Product
exports.postEditProduct = (req, res, next) => {
    const { productId, title, imageUrl, price, description } = req.body;
    Product.findByPk(productId)
        .then( product => {
            product.title = title
            product.imageUrl = imageUrl
            product.price = price
            product.description = description
            return product.save();
        })
        .then( result => {
            res.redirect('/admin/products');
        })
        .catch( err => {
            console.log(err)
        })

}


//Delete Product
exports.postDeleteProduct = (req, res, next) => {
    const { productId } = req.body;
    Product.destroy({where: {id:productId}})
        .then( resDb=> {
            res.redirect('/admin/products');
        })
        .catch( res => console.log(err))}