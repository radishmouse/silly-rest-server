
// models creatures.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CreatureSchema = new Schema({
    name: String,
    type: String,
    date: Date,
    location: String,
    witnesses: {
        type: Number,
        min: 1
    }
});

module.exports = mongoose.model('Creature', CreatureSchema);
