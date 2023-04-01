let User = require('../models/userModel');

/**
 * Créer un utilisateur
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
*/
exports.create = function (req, res, next){
    const password = req.body.password;
    const userData = {
        name: req.body.name,
        first_name: req.body.first_name,
        birthday: req.body.birthday,
        city: req.body.city,
        email: req.body.email,
    };

    const user = new User(userData);
    user.setPassword(password);
    user.save().then(() => {
        // req.session.user = user; // A supprimer ou remplacer
        res.json(userData);
    });
};

/**
 * Retourne tous les utilisateurs
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.readAll = function (req, res, next) {
    User.find({}).select(["-hash", "-salt"]).then((resp) => {
        res.json(resp);
    });
};

/**
 * Retourne un utilisateur
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
*/
exports.read = function (req, res, next) {
    User.findById(req.params.id).then((resp) => {
        res.json(resp);
    });
};

/**
 * Update un utilisateur
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
*/
exports.update = function (req, res, next){
    console.log(req.params.id);
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((resp) => {
        res.json(resp);
    });
};

/**
 * Supprime un utilisateur
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
*/
exports.delete = function (req, res, next){
    User.findByIdAndDelete(req.params.id).then((resp) => {
        res.json(resp);
    });
};