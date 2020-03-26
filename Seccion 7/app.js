const express = require('express');
const bodyParser = require('body-parser');
const rootPath = require('./util/path');
const path = require('path');

const app = express();

app.set('view engine','ejs');
app.set('views','views') //By default in views

//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public'))); 
//Leave public all the files into public, without need the url diractly

// Routes
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop');
const notFound = require('./controllers/404')

app.use(shopRoutes);
app.use('/admin',adminRoutes);

app.use(notFound.get404);


app.listen(3000);