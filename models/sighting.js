
// models sighting.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SightingSchema = new Schema({
    cryptid: Number,
    date: Date,
    location: String,
    witness: Number
});

module.exports = mongoose.model('Sighting', SightingSchema);
