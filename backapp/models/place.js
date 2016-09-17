var mongoose = require('mongoose');

var placeSchema = mongoose.Schema({
    place_id: String,
    going: { type: Number, default: 0 }
});

module.exports = mongoose.model('Place', placeSchema);
