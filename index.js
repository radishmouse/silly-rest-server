'use strict';


// Basic App setup --------------------
var path = require('path');
var express = require('express');
var app = express();
var port = process.env.PORT || 1337;

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
var Model = require('./models/menuitem');
var modelName = 'menuitem';



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


// Routes for adding to and retrieving collections
router.route('/' + modelName + 's')
    .post(function (req, res) {
        var model = new Model();
        for (var key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                model[key] = req.body[key];
            }
        }

        model.save(function (err) {
            if (err) {
                res.send(err);
            }

            res.json({ message: modelName + ' created', id: model._id })
        });
    })
    .get(function (req, res) {
        Model.find(function (err, models) {
            if (err) {
                res.send(err);
            }

            res.json(models);
        })
    });

// Routes for a single model
router.route('/' + modelName + 's/:id')
    .get(function (req, res) {
        console.log(req.params);
        Model.findById(req.params.id, function (err, model) {
            if (err) {
                res.send(err);
            }
            res.json(model);
        });
    })
    .put(function (req, res) {
        Model.findById(req.params.id, function (err, model) {
            if (err) {
                res.send(err);
            }
            for (var key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    model[key] = req.body[key];
                }
            }
            console.log(req.body);
            model.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: modelName + ' updated' });
            });
        });
    })
    .delete(function (req, res) {
        Model.remove({
            _id: req.params.id
        }, function (err, model) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted ' + modelName + ' ' + req.params.id });
        });
    });


// Fire it up! Fire it up!------------------------------
app.use('/api', router);
app.listen(port, '0.0.0.0');
console.log('Now you are leet: ' + port);
