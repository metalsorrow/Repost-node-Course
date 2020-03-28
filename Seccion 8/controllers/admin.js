const  Product = require('../models/product');
    

//Admin Add Product View
exports.getAddProduct = (req,res,next) => {
    res.render('admin/edit-product',{ 
            pageTitle: 'Add Product',
            path:'/admin/add-product',
            editing: false
        })
}

//Admin Add Product
exports.postAddProduct = (req,res,next) => {
    const {title, imageUrl, price, description} = req.body;
    const product = new Product(null ,title, imageUrl, price, description);
    product.save();
    res.redirect('/'); //TODO: redirect to admin or user products
}

//Admin Products list View
exports.getAdminProducts = (req,res,next)=> {
    Product.fetchAll((products)=>{
        res.render('admin/product-list',{prods: products, pageTitle: 'Admin Products', path:'/admin/products'})
    });
}

//Edit Product View
exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit; 
    const productId = req.params.productId;
    if(!editMode){
        return res.redirect('/');
    }


    Product.findById(productId, (product) => {
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product',{
            product: product,
            pageTitle: 'Edite Product',
            path: "/admin/edit-product",
            editing: editMode})
    })
}

//Edit Product
exports.postEditProduct = (req,res,next) => {
    const {productId, title,imageUrl, price, description} = req.body;
    const updateProduct = new Product(productId, title, imageUrl,price, description);
    
    updateProduct.save();
    res.redirect('/admin/product-list');
}


//Delete Product
exports.postDeleteProduct = (req,res,next) => {
    const {productId} = req.body;
    Product.deleteById(productId)
    res.redirect('/admin/products');
}