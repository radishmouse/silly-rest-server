
// models cryptid.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CryptidSchema = new Schema({
    name: String,
    type: String,
    profile_img: String,
    sightings:[{ type:Schema.ObjectId, ref:"Sighting" }]
});

module.exports = mongoose.model('Cryptid', CryptidSchema);

