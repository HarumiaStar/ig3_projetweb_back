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
        if (userData) return res.json(userData);
        throw new Error();
    }).catch((err) => {
        console.log(err);
        res.status(500).send({error : "Impossible sauvegarder cet utilisateur."});
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
        if (resp) return res.json(resp);
        throw new Error();
    }).catch((err) => {
        console.log(err);
        res.status(500).send({error : "Impossible de lire la liste des utilisateurs."});
    });
};

/**
 * Retourne un utilisateur
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
*/
exports.read = function (req, res, next) {
    User.findById(req.params.id).select(["-is_admin", "-hash", "-salt"]).then((resp) => {
        if (resp) return res.json(resp);
        throw new Error();
    }).catch((err) => {
        console.log(err);
        res.status(500).send({error : "Impossible de lire les informations de cet utilisateur."});
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
    User.findById(req.params.id).select("-is_admin").then((user) =>{
        if (reqBody.name) user.name = reqBody.name;
        if (reqBody.first_name) user.first_name = reqBody.first_name;
        if (reqBody.birthday) user.birthday = reqBody.birthday;
        if (reqBody.city) user.city = reqBody.city;
        if (reqBody.email) user.email = reqBody.email;

        if (reqBody.newPassword && reqBody.password){
            if (user.validPassword(reqBody.password)){
                if (!regexPassword(reqBody.newPassword)) return res.status(500).send({error: "Le mot de passe doit contenir au moins huit caractères, dont au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial."});
                user.setPassword(reqBody.newPassword);
            }
            else return res.status(500).send({error: "Le mot de passe n'est pas correct."});
        }
        user.save().then(() => {
            user.hash = undefined;
            user.salt = undefined;
            res.json(user);
        }).catch((err) => {
            console.log(err);
            res.status(500).send({error : "Impossible de mettre à jour les données cet utilisateur."});
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({error : "Impossible de mettre à jour cet utilisateur."});
    });
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
    User.findByIdAndDelete(req.params.id).select(["-hash", "-salt"]).then((resp) => {
        if (resp) return res.json(resp);
        throw new Error();
    }).catch((err) => {
        console.log(err);
        res.status(500).send({error : "Impossible de supprimer cet utilisateur."});
    });
};