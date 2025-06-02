const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
    id: Number,
    name: String,
    state: String,
    coord: {
        lon: Number,
        lat: Number
    }
});

module.exports = mongoose.model('Campground', CitySchema);