const mongoose = require('mongoose');

/**
 * Schéma d'un film
*/
const FilmSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    overview: String,
    poster_path: String,
    release_date: Date,
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    }]
},
{
    collection: 'films',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Film', FilmSchema);