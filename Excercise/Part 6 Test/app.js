const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const userRoutes = require('./routes/users');

//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static( path.join(__dirname,'public')));

//Engine (set variables)
app.set('view engine','ejs');
app.set('views','views');


//Routes
app.use(userRoutes);

app.use((req, res) => {
    res.render('404',{pageTitle: '404'})
})

//Listen port 3000, up server
app.listen(3000);