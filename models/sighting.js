
// models creatures.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SighitngSchema = new Schema({
    cryptid: Number,
    date: Date,
    location: String,
    witnesses: Array
});

module.exports = mongoose.model('Sighting', CreatureSchema);
