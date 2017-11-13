const express = require ('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');

const hostname = 'localhost';
const port = 3000;

const app = express(); //our application will use express
app.use(morgan('dev')); //can use morgan as and when required
app.use(bodyParser.json());//can use bodyParser when required and it helps to parse the json format

//mounting of dishRouter
app.use('/dishes', dishRouter); //any request coming to /dishes will be handled by dishRouter

//for dishIDs
app.get('/dishes/:dishId', (req,res,next) => {
    res.end('Will send details of the dish: '+ req.params.dishId + ' to you!');
});

app.post('/dishes/:dishId', (req, res, next) => {	//req.body has parsed the json data
	res.statusCode = 403;	
	res.end('Post operation is not supported on /dishes/'+ req.params.dishId);});

app.put('/dishes/:dishId', (req, res, next) => {	
	res.write('Updating the dish: '+ req.params.dishId + '\n');
	res.end('Will update the dish '+ req.body.name + 'with details: '+ req.body.description);
});

app.delete('/dishes/:dishId', (req,res,next) => {
    res.end('Deleting dish:' + req.params.dishId);
});


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