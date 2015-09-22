'use strict';


// Basic App setup --------------------
var path = require('path');
var express = require('express');
var API = require('json-api');
var app = express();
var port = process.env.PORT || 1337;
var APIError = API.types.Error;

var makeRoutes = require('./router-maker');

var bodyParser = require('body-parser');
app.use(bodyParser());

console.log(path.join(__dirname, './static/'));
app.use(express.static(path.join(__dirname, './static')));

var MONGO_URI = "mongodb://heroku_app27990738:688ajf79f2s5oa77kg8q324rce@ds053419.mongolab.com:53419/heroku_app27990738";
// var MONGO_URI = 'mongodb://localhost/myapp';

// Database ORM, thanks to mongoose
var mongoose = require('mongoose');
mongoose.connect(MONGO_URI);

// Our models
var models = {
    Cryptid : require('./models/cryptid'),
    Sighting : require('./models/sighting'),
    Witness : require('./models/witness')
};

// Adapter for JSON-API
var adapter = new API.dbAdapters.Mongoose(models);
var registry = new API.ResourceTypeRegistry();
var Controller = new API.controllers.API(registry);


["sightings", "cryptids", "witnesses"].forEach(function(resourceType) {
  var description = require('./resource-descriptions/' + resourceType);
  description.dbAdapter = adapter;
  registry.type(resourceType, description);
})

var Docs = new API.controllers.Documentation(registry, {name: 'Tracker API'});

// Initialize the express app + front controller.
var app = express();

var Front = new API.httpStrategies.Express(Controller, Docs);
var apiReqHandler = Front.apiRequest.bind(Front);

var router = express.Router();

// some really basic logging middleware
router.use(function (req, res, next) {
    console.log('Accessing ' + req.path);
    next();
});

// This is for cross domain fun
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, Content-Length, X-Requested-With');
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.status(200).send('OK');
  } else {
    next();
  }
});



// Now, add the routes.
// To do this in a more scalable and configurable way, check out
// http://github.com/ethanresnick/express-simple-router. To protect some
// routes, check out http://github.com/ethanresnick/express-simple-firewall.
app.get("/", Front.docsRequest.bind(Front));
app.route("/api/:type(sightings|cryptids|witnesses)")
  .get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler);
app.route("/api/:type(sightings|cryptids|witnesses)/:id")
  .get(apiReqHandler).patch(apiReqHandler).delete(apiReqHandler);
app.route("/api/:type(sightings|cryptids|witnesses)/:id/relationships/:relationship")
  .get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler);

app.use(function(req, res, next) {
  Front.sendError(new APIError(404, undefined, 'Not Found'), req, res);
});

// And we're done! Start 'er up!
app.listen(port, '0.0.0.0');
console.log('Now you are http://localhost:' + port);





// // Routing --------------------------------
// var router = express.Router();

// // some really basic logging middleware
// router.use(function (req, res, next) {
//     console.log('Accessing ' + req.path);
//     next();
// });

// // This is for cross domain fun
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

//     next();
// });

// router.get('/', function (req, res) {
//     res.json({message: 'so say we all'});
// });


// Dynamically create routes for models
// makeRoutes(router, MenuItem, 'menuitem');
// makeRoutes(router, Creature, 'creature');
// makeRoutes(router, Cryptid, 'cryptid');
// makeRoutes(router, Sighting, 'sighting');
// makeRoutes(router, Witness, 'witness', 'witnesses');


// Fire it up! Fire it up!------------------------------
// app.use('/api', router);
// app.listen(port, '0.0.0.0');
// console.log('Now you are 1337: ' + port);
