
// models sighting.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");


var SightingSchema = new Schema({
    cryptid: { type:Schema.ObjectId, ref:"Cryptid", childPath:"sightings" },
    created_at: { type: Date, default: Date.now },
    sighted_at: { type: Date, default: Date.now },
    location: String,
    witnesses: [{ type:Schema.ObjectId, ref:"Witness", childPath:"sightings" }]
});
SightingSchema.plugin(relationship, { relationshipPathName:'cryptid' });
SightingSchema.plugin(relationship, { relationshipPathName:'witnesses' });

module.exports = mongoose.model('Sighting', SightingSchema);

