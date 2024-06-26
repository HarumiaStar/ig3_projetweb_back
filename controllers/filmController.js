let Film = require('../models/filmModel');
const Session = require('../models/sessionModel');
const Booking = require('../models/bookingModel');

/**
 * Retourne tous les films
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.readAll = function (req, res, next) {
    Film.find({}).populate('genres')
        .then((resp) => {
            if (resp) return res.json(resp);
            throw new Error();
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ error: "Impossible de lire les informations des films." });
        });
}

/**
 * Retourne les données d'un film en fonction de son id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.read = function (req, res, next) {
    Film.findById(req.params.id).populate('genres')
        .then((resp) => {
            if (resp) return res.json(resp);
            throw new Error();
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ error: "Impossible de lire les informations de ce film." });
        });
};

/**
 * Création d'un film
 * Retourne les données de celui-ci
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.create = function (req, res, next) {
    Film.create(req.body).then((resp) => {
        if (resp) return res.json(resp);
        throw new Error();
    })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ error: "Impossible de créer ce film." })
        })
}

/**
 * Supprime un film
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.delete = function (req, res, next) {
    Session.find({ film: req.params.id }).then((sessions) => {
        const sessionIds = sessions.map(session => session._id);
        Booking.deleteMany({ session: { $in: sessionIds } }).then(() => {
            Session.deleteMany({ film: req.params.id }).then(() => {
                Film.findByIdAndDelete(req.params.id).then((resp) => {
                    if (resp) return res.json(resp);
                    throw new Error();
                }).catch((err) => {
                    console.log(err);
                    res.status(500).send({ error: "Impossible de supprimer ce film." });
                });
            }).catch((err) => {
                console.log(err);
                res.status(500).send({ error: "Impossible de supprimer les sessions de ce film." });
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ error: "Impossible de supprimer les réservations de ce film." });
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ error: "Impossible de trouver les sessions de ce film." });
    });
};

/**
 * Met à jour un film
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.update = function (req, res, next) {
    Film.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('genres')
        .then((resp) => {
            if (resp) return res.json(resp);
            throw new Error();
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ error: "Impossible de mettre à jour les données ce film." });
        });
}
