const http = require('http');
const routes = require('./routes');



//crea una funcion que va a ser recibida cada ves que llegue una request
const server = http.createServer( routes.handler );
console.log(routes.message)
// server.close();

//Se mantiene  activo para estar pendiente de las funciones entrantes
server.listen(3000, ()=> {
    console.log("server run")
});
