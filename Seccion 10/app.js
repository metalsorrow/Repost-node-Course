const express = require('express');
const bodyParser = require('body-parser');
const rootPath = require('./util/path');
const path = require('path');
const sequalize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/user')

const app = express();

app.set('view engine','ejs');
app.set('views','views') //By default in views

//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public'))); 
//Leave public all the files into public, without need the url diractly
app.use((req,res,next) => {
   User.findByPk(1)
    .then( user => {
        //This is a reference of User object, we can execute destroy in this scope
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



// M : 1
Product.belongsTo(User, { constraints: true, onDelete: false})
User.hasMany(Product);

// sequalize.sync({force: true})
//Allow user ever
sequalize.sync()
    .then( res => {
        return User.findByPk(1);
    })
    .then( user => {
        if(!user){
            User.create({ name:'max', email: 'marc@fuentes.cl'})
        }
        return user;
    })
    .then(user => {
        console.log(user)
    })
    .catch( err => {
        // console.log(err)
    })

app.listen(3000, () => {
    console.log("server ON!")
});