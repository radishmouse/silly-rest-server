
// models menuitems.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MenuItemSchema = new Schema({
    name: String,
    category: String,
    description: String,
    ingredients: String,
    price: {
        type: Number,
        min: 1
    },
    heat: {
        type: Number,
        min: 1
    },
    active: Boolean,
    availability: String
});

var MenuItemModel = mongoose.model('MenuItem', MenuItemSchema);
MenuItemModel.schema.path(ingredients).validate(function (value) {
    return value && (value.length > 0);
});
module.exports = MenuItemModel;
