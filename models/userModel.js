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
    hash: {
        type: String,
        select: false
    },
    salt: {
        type: String,
        select: false
    },
    
    is_admin: {
        type: Boolean,
        default: false,
        requried: false
    },

    password_token_reset: {
        type: String,
        default: "",
        select: false
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

UserSchema.methods.setPasswordTokenReset = function() {
    const token = crypto.randomBytes(32).toString('hex');
    this.password_token_reset = token;
};


module.exports = mongoose.model('User', UserSchema);