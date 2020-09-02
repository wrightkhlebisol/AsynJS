const mongoose = require("mongoose");

let genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

let Genres = mongoose.model('genre', genreSchema);
exports.Genres = Genres;
