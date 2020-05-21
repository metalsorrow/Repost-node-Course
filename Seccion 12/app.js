const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoConnect = require('./util/database');

const app = express();

app.set('view engine','ejs');
app.set('views','views') //By default in views

//Middleware
app.use(bodyParser.urlencoded({extended: false}));
//Leave public all the files into public, without need the url diractly
app.use(express.static(path.join(__dirname,'public'))); 


app.use((req,res,next) => {
//    User.findByPk(1)
//     .then( user => {
//         //This is a reference of User (Sequelize) object, we can execute destroy in this scope
//         req.user = user;
//         next();
//     })
//     .catch( err => {
//         console.log(err)
//     })
})




// Routes
// const adminRoutes = require('./routes/admin')
// const shopRoutes = require('./routes/shop');
// const notFound = require('./controllers/404')

// app.use(shopRoutes);
// app.use('/admin',adminRoutes);

// app.use(notFound.get404);








mongoConnect( res => {
    console.log(res);
    app.listen(app.get('port'));
})
