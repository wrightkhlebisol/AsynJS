let mongoose = require('mongoose');
let {
    genreSchema
} = require('./genres');

let moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
    },
    dailyRentalRate: {
        type: Integer,
        required: true
    }
});

let Movies = mongoose.model('movies', moviesSchema);
exports.Movies = Movies;
