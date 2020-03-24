

const eventHandler = (req,res)=> {
    const url = req.url;
    const method = req.method;
    
    if(url==='/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<h1>Welcome to nodeJs</h1>');
        res.write('<form action="/users" method="POST"> <button type="submit"> Ir a Usuarios </button>  </form>')
        res.write('<h1>Submit user</h1>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="user" placeholder="New User"> <input type="submit" value="Ir a Usuarios"> </form>')
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if(url==='/users'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<form action="/" method="POST"> <input type="submit" value="Home"> </form>')
        res.write('<ul>');
        res.write('<li> User 1');
        res.write('</li>');
        res.write('<li> User 2');
        res.write('</li>');
        res.write('<li> User 3');
        res.write('</li>');
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if(url ==='/create-user'){
        const rawData = [];
        req.on('data', (chunk) => {
            rawData.push(chunk);
        })
        req.on('end',()=> {
            let data = Buffer.concat(rawData).toString().split('=');
            console.log(data)
            res.setHeader('Content-Type','text/html');
            res.write('<html>');
            res.write('<body>');
            res.write(`<h1> ${data[0]} </h1>`);
            res.write(`<h2> ${data[1]} </h2>`);
            res.write('<form action="/" method="POST"> <button type="submit"> Ir a home </button>  </form>')
            res.write('</body>');
            res.write('</html>');
            return res.end();
            return res.end();
        })
    }
}



module.exports = eventHandler;