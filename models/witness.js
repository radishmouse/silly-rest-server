
// models creatures.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var WitnessSchema = new Schema({
    fname: String,
    lname: String
});

module.exports = mongoose.model('Witness', CreatureSchema);
