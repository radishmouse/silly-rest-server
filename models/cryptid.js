
// models cryptid.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CryptidSchema = new Schema({
    name: String,
    type: String
});

module.exports = mongoose.model('Cryptid', CryptidSchema);
