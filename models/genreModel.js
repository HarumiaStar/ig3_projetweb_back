const mongoose = require('mongoose');

/**
 * Schéma d'un genre
*/
const GenreSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
},
{
    collection: 'genres',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Genre', GenreSchema);