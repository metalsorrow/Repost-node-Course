const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-scheme','root', '123',
{dialect:'mysql',
host:'localhost',
port:3305});


module.exports = sequelize;