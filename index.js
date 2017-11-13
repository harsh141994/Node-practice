const express = require ('express');
const http = require('http');

const hostname = 'localhost';
const port = 3000;

const app = express(); //our application will use express

//function to setup our server
app.use((req, res, next) => {
	console.log(req.headers);
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

//creating the server
const server = http.createServer(app);

//listening to server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});