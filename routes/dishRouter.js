const express = require ('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

//all the following is just the one group, just to avoid any mismatch (/dishes or /dish)
//further we need to mount this router in the index.js
dishRouter.route('/')
.all((req, res, next)=>{ //for /dishes , all means for all get, post, put, delete do this
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next(); // this asks the function to look further for the /dishes callbacks
})

//because of the next(), program will execute this also
.get((req,res,next) => {
    res.end('Will send all the dishes to you!');
})

.post((req, res, next) => {	//req.body has parsed the json data
	res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})

.put((req, res, next) => {	
	res.statusCode = 403;	
	res.end('Put operation is not supported on /dishes');
})

.delete((req,res,next) => {
    res.end('Deleting all the dishes!');
});


module.exports = dishRouter;
