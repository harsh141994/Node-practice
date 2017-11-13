const express = require ('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');



const hostname = 'localhost';
const port = 3000;

const app = express(); //our application will use express
app.use(morgan('dev')); //can use morgan as and when required
app.use(bodyParser.json());//can use bodyParser when required and it helps to parse the json format

//mounting of dishRouter
app.use('/dishes', dishRouter); //any request coming to /dishes will be handled by dishRouter

app.use('/promotions', promoRouter); //any request coming to /promotions will be handled by promoRouter
app.use('/leaders', leaderRouter);


app.use(express.static(__dirname+'/public'))  //use the static html files from this path

//function to setup our server
app.use((req, res, next) => {
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