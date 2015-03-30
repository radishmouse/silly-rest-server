
// models witness.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var WitnessSchema = new Schema({
    fname: String,
    lname: String,
    sightings:[{ type:Schema.ObjectId, ref:"Sighting" }]
});

module.exports = mongoose.model('Witness', WitnessSchema);
