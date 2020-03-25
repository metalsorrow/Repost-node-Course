const express = require('express');
const bodyParser = require('body-parser');
const rootPath = require('./util/path');
const path = require('path');
const expressHbs = require('express-handlebars')

const app = express();

//Add new engine
app.engine('hbs', expressHbs({ layoutsDir: 'views/layouts/', defaultLayout:'main', extname: 'hbs'}))
app.set('view engine','hbs');
app.set('views','views') //By default in views

//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public'))); 
//Leave public all the files into public, without need the url diractly

// Routes
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop');

app.use(shopRoutes);
app.use('/admin',adminRoutes.router);

app.use((req,res,next) => {
    res.status(404).render('404',{pageTitle: 'Page not Found!'})
});


app.listen(3000);