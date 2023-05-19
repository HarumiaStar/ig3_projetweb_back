const mongoose = require('mongoose');

/**
 * Schéma d'une séance
*/
const SessionSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true
    },
    film: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Film'
    },
    cinema: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cinema'
    },
    seats: Number
},
{
    collection: 'sessions',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Session', SessionSchema);