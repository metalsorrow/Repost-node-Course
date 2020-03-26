const  Product = require('../models/product');
    

//Admin Add Product
exports.getAddProduct = (req,res,next) => {
    res.render('admin/add-product',{ 
            pageTitle: 'Add Product',
            path:'/admin/add-product'
        })
}

//Admin Add Product GUARDAR
exports.postAddProduct = (req,res,next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/'); //TODO: redirect to admin or user products
}

//Admin Products list
exports.getAdminProducts = (req,res,next)=> {
    Product.fetchAll((products)=>{
        res.render('admin/product-list',{prods: products, pageTitle: 'Admin Products', path:'/admin/products'})
    });
}

//Editar Productos
exports.getEditProduct = (req,res,next) => {
    res.render('admin/edit-product',{pageTitle: 'Edite Product'})
}