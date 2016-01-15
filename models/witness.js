
// models witness.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

var WitnessSchema = new Schema({
    f_name: String,
    l_name: String,
    sightings:[{ type:Schema.ObjectId, ref:"Sighting", childPath:"witnesses" }]
});

WitnessSchema.plugin(relationship, { relationshipPathName:'sightings' });
module.exports = mongoose.model('Witness', WitnessSchema);
