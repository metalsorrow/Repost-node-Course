const express = require('express');
const router = express.Router()


const users = []

router.get('/',(req, res) => {
    res.render('home', {pageTitle: 'Welcome to the login', path: '/'});
})
router.get('/users',(req, res) => {
    console.log(users)
    res.render('users',{pageTitle: "List Users", users , path:'/users'})
})
router.post('/users',(req, res) => {
    users.push(req.body);
    res.redirect('/users');
})


module.exports = router;