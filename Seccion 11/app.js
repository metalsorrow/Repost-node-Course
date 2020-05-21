const express = require('express');
const bodyParser = require('body-parser');
const rootPath = require('./util/path');
const path = require('path');
const sequalize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

const app = express();

app.set('view engine','ejs');
app.set('views','views') //By default in views

//Middleware
app.use(bodyParser.urlencoded({extended: false}));
//Leave public all the files into public, without need the url diractly
app.use(express.static(path.join(__dirname,'public'))); 


app.use((req,res,next) => {
   User.findByPk(1)
    .then( user => {
        //This is a reference of User (Sequelize) object, we can execute destroy in this scope
        req.user = user;
        next();
    })
    .catch( err => {
        console.log(err)
    })
})




// Routes
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop');
const notFound = require('./controllers/404')

app.use(shopRoutes);
app.use('/admin',adminRoutes);

app.use(notFound.get404);



// Relation Model
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem});


//Allow user always
sequalize.sync()
// sequalize.sync({force: true})
    .then( res => {
        return User.findByPk(1);
    })
    .then( user => {
        if(!user){
            User.create({ name:'max', email: 'marc@fuentes.cl'})
            .then(user => {
                return  user.createCart();
            })
        }
        return user;
    })
    .then( cart => {
        app.listen(3000);
    })
    .catch( err => {
        // console.log(err)
    })
