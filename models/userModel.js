const mongoose = require('mongoose');
const crypto = require('crypto');

/**
 * Schéma d'un utilisateur
*/
const UserSchema = new mongoose.Schema({
    name: String,
    first_name: String,
    birthday: Date,
    city: String,
    
    email: {
        type: String,
        unique: true
    },
    hash: String,
    salt: String,
    
    is_admin: {
        type: Boolean,
        default: false,
        requried: false
    },
},
{
    collection: 'users',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// Method to set salt and hash the password for a user 
UserSchema.methods.setPassword = function(password) {
    // Creating a unique salt for a particular user 
    this.salt = crypto.randomBytes(16).toString('hex');
    // Hashing user's salt and password with 1000 iterations, 
    this.hash = crypto.pbkdf2Sync(password, this.salt,
                                  1000, 64, `sha512`).toString(`hex`);
};

// Method to check the entered password is correct or not 
UserSchema.methods.validPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password,
                                 this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === hash;
};


module.exports = mongoose.model('User', UserSchema);