
// models sighting.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");


var SightingSchema = new Schema({
    creature: { type:Schema.ObjectId, ref:"Cryptid", childPath:"sightings" },
    date: Date,
    location: String,
    witnesses: [{ type:Schema.ObjectId, ref:"Witness" }]
});
SightingSchema.plugin(relationship, { relationshipPathName:'creature' });
SightingSchema.plugin(relationship, { relationshipPathName:'witnesses' });

module.exports = mongoose.model('Sighting', SightingSchema);

