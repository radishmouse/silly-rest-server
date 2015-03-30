'use strict';


// Basic App setup --------------------
var path = require('path');
var express = require('express');
var app = express();
var port = process.env.PORT || 1337;

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
var MenuItem = require('./models/menuitem');
var Creature = require('./models/creature');
var Cryptid = require('./models/cryptid');
var Sighting = require('./models/sighting');
var Witness = require('./models/witness');


// Routing --------------------------------
var router = express.Router();

// some really basic logging middleware
router.use(function (req, res, next) {
    console.log('Accessing ' + req.path);
    next();
});

// This is for cross domain fun
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

    next();
});

router.get('/', function (req, res) {
    res.json({message: 'so say we all'});
});


// Dynamically create routes for models
makeRoutes(router, MenuItem, 'menuitem');
makeRoutes(router, Creature, 'creature');
makeRoutes(router, Cryptid, 'cryptid');
makeRoutes(router, Sighting, 'sighting');
makeRoutes(router, Witness, 'witness');


// Fire it up! Fire it up!------------------------------
app.use('/api', router);
app.listen(port, '0.0.0.0');
console.log('Now you are 1337: ' + port);
