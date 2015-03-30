
// models sighting.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");


var SightingSchema = new Schema({
    creature: { type:Schema.ObjectId, ref:"Cryptid", childPath:"sightings" }
    date: Date,
    location: String,
    witness: Number
});
SightingSchema.plugin(relationship, { relationshipPathName:'creature' });

module.exports = mongoose.model('Sighting', SightingSchema);

