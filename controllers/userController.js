let User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('key.pub');

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
        if (userData) {
            userData._id = user._id.toString();
            return res.json(userData);
        }
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
    User.find({}).then((resp) => {
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
    User.findById(req.params.id).select("-is_admin").then((resp) => {
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
    return password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
}

/**
 * Supprime un utilisateur
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
*/
exports.delete = function (req, res, next){
    User.findByIdAndDelete(req.params.id).then((resp) => {
        if (resp) return res.json(resp);
        throw new Error();
    }).catch((err) => {
        console.log(err);
        res.status(500).send({error : "Impossible de supprimer cet utilisateur."});
    });
};

/**
 * Fonction de Login
 * @param {*} req
 * @param {*} res
 * @param {*} next
*/
exports.login = function (req, res, next) {
    User.findOne({email: req.body.email}).select(["+hash", "+salt"]).then((user) => {
        if (user.validPassword(req.body.password)){
            const token = jwt.sign(user.toObject(), privateKey , {algorithm: 'HS256', expiresIn: 60*60*24});
            res.status(200).json({
                message : "Vous vous êtes bien connecté",
                token	: token
            });
        }
        else {
            res.status(500).send({error: "L'email ou le mot de passe n'est pas correct."});
        }
    })
    .catch(() => {
        res.status(500).send({error: "L'email ou le mot de passe n'est pas correct."});
    });
}