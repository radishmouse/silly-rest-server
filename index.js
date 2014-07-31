'use strict';


// Basic App setup --------------------
var express = require('express');
var app = express();
var port = process.env.PORT || 1337;

var bodyParser = require('body-parser');
app.use(bodyParser());

// Database ORM, thanks to mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myapp');

// Our models
var Creature = require('./models/creature');



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
router.route('/creatures')
    .post(function (req, res) {
        var creature = new Creature();
        for (var key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                creature[key] = req.body[key];
            }
        }

        creature.save(function (err) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Creature created', id: creature._id })
        });
    })
    .get(function (req, res) {
        Creature.find(function (err, creatures) {
            if (err) {
                res.send(err);
            }

            res.json(creatures);
        })
    });

// Routes for a single creature
router.route('/creatures/:creature_id')
    .get(function (req, res) {
        console.log(req.params);
        Creature.findById(req.params.creature_id, function (err, creature) {
            if (err) {
                res.send(err);
            }
            res.json(creature);
        });
    })
    .put(function (req, res) {
        Creature.findById(req.params.creature_id, function (err, creature) {
            if (err) {
                res.send(err);
            }
            for (var key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    creature[key] = req.body[key];
                }
            }
            console.log(req.body);
            creature.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Creature updated' });
            });
        });
    })
    .delete(function (req, res) {
        Creature.remove({
            _id: req.params.creature_id
        }, function (err, creature) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted ' + creature });
        });
    });


// Fire it up! Fire it up!------------------------------
app.use('/api', router);
app.listen(port, '0.0.0.0');
console.log('Now you are leet: ' + port);
