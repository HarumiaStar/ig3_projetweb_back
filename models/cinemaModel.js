const mongoose = require('mongoose');

/**
 * Schéma d'un cinema
*/
const CinemaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    adress: String,
    postal_code: String,
    city: String,
    country: String
},
{
    collection: 'cinemas',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Cinema', CinemaSchema);