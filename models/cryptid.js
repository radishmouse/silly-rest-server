
// models cryptid.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");


var CryptidSchema = new Schema({
    name: String,
    cryptid_type: String,
    profile_img: String,
    sightings:[{ type:Schema.ObjectId, ref:"Sighting", childPath:"cryptids" }]
});

CryptidSchema.plugin(relationship, { relationshipPathName:'sightings' });
module.exports = mongoose.model('Cryptid', CryptidSchema);

