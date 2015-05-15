
// models sighting.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");


var SightingSchema = new Schema({
    cryptid: { type:Schema.ObjectId, ref:"Cryptid", childPath:"sightings" },
    created_at: { type: Date },
    sighted_at: { type: Date },
    location: String,
    witnesses: [{ type:Schema.ObjectId, ref:"Witness", childPath:"sightings" }]
});
SightingSchema.pre('save', function(next){
  now = new Date();
  if ( !this.created_at ) {
    this.sighted_at = now;
    this.created_at = now;
  }
  console.log('checking date');
  next();
});
SightingSchema.plugin(relationship, { relationshipPathName:'cryptid' });
SightingSchema.plugin(relationship, { relationshipPathName:'witnesses' });

module.exports = mongoose.model('Sighting', SightingSchema);

