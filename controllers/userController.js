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
    if (!regexPassword(password)) return res.status(500).send({error: "Le mot de passe doit contenir au moins huit caractères, dont au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial."});
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
    const reqBody = req.body;
    User.findById(req.params.id).select(["-is_admin", "-hash", "-salt"]).then((u) =>{
        if (reqBody.name) u.name = reqBody.name;
        if (reqBody.first_name) u.first_name = reqBody.first_name;
        if (reqBody.birthday) u.birthday = reqBody.birthday;
        if (reqBody.city) u.city = reqBody.city;
        if (reqBody.email) u.email = reqBody.email;

        if (reqBody.newPassword && reqBody.password){
            if (u.validPassword(reqBody.password)){
                if (!regexPassword(reqBody.newPassword)) return res.status(500).send({error: "Le mot de passe doit contenir au moins huit caractères, dont au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial."});
                u.setPassword(reqBody.newPassword);
            }
        }
        u.save().then(() => {
            res.json(u);
        });
        /*const password = req.body.password;
        if (password) u.setPassword(password);*/
    })
};

function regexPassword(password){
    regexOk = password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
    if (regexOk) return true;
    return false;
}

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