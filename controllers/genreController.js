let Genre = require('../models/genreModel');

/**
 * Retourne tous les genres
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.readAll = function (req, res, next) {
    Genre.find({})
        .then((resp) => {
            if (resp) return res.json(resp);
            throw new Error();
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ error: "Impossible de lire les informations des genres." });
        });
}

/**
 * Retourne les données d'un genre en fonction de son id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.read = function (req, res, next) {
    Genre.findById(req.params.id).then((resp) => {
        if (resp) return res.json(resp);
        throw new Error();
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ error: "Impossible de lire les informations de ce genre." });
    });
};

/**
 * Création d'un genre
 * Retourne les données de celui-ci
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.create = function (req, res, next) {
    Genre.create(req.body).then((resp) => {
        if (resp) return res.json(resp);
        throw new Error();
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({ error: "Impossible de créer ce genre." })
    })
}

/**
 * Supprime un genre
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.delete = function (req, res, next) {
    Genre.findByIdAndDelete(req.params.id).then((resp) => {
        if (resp) return res.json(resp);
        throw new Error();
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ error: "Impossible de supprimer ce genre." });
    });
};

/**
 * Met à jour un genre
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.update = function (req, res, next) {
    Genre.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((resp) => {
        if (resp) return res.json(resp);
        throw new Error();
    })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ error: "Impossible de mettre à jour les données de ce genre." });
        });
}
