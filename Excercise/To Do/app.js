const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Conten   t-type', 'text/html')
        res.write('<html><body><form action="/ToDo" method="POST"> <input type="text" name="categoria" placeholder="categoria"> <input type="text" name="tarea" placeholder="tarea"> <input type="submit" value="Enviar"> </form> </body></html>')
        return res.end();
    }
    if (url === '/ToDo' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        })

        return req.on('end', () => {
            let dataRequest = {};
            let toJson = Buffer.concat(body).toString().split('&');
            let todoFile;
            let date = new Date().getTime();

            //Generar nueva tarea
            toJson.map(element => {
                let elements = element.split('=');
                dataRequest[elements[0]] = elements[1]
            })

            //Obtener datos del json
            todoFile = JSON.parse(fs.readFileSync('./todoList.json'));
            
            //agregar a el campo correspondiente
            todoFile[date] = dataRequest;

            //push al archivo
            fs.writeFileSync('todoList.json',JSON.stringify(todoFile))

            res.statusCode = 200;
            res.("POSTED");
            return res.end();
        })
    }
});


server.listen(3000, () => {
    console.log("server on fire")
})