let Cinema = require('../models/cinemaModel');
const Session = require('../models/sessionModel');
const Booking = require('../models/bookingModel');

/**
 * Retourne tous les Cinemas
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.readAll = function (req, res, next) {
    Cinema.find({})
        .then((resp) => {
            if (resp) return res.json(resp);
            throw new Error();
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ error: "Impossible de lire les informations des cinemas." });
        });
}

/**
 * Retourne les données d'un Cinema en fonction de son id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.read = function (req, res, next) {
    Cinema.findById(req.params.id).then((resp) => {
        if (resp) return res.json(resp);
        throw new Error();
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ error: "Impossible de lire les informations de ce cinema." });
    });
};

/**
 * Création d'un Cinema
 * Retourne les données de celui-ci
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.create = function (req, res, next) {
    Cinema.create(req.body).then((resp) => {
        if (resp) return res.json(resp);
        throw new Error();
    })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ error: "Impossible de créer ce cinema." })
        })
}

/**
 * Supprime un Cinema
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.delete = function (req, res, next) {
    Session.find({ cinema: req.params.id }).then((sessions) => {
        const sessionIds = sessions.map(session => session._id);
        Booking.deleteMany({ session: { $in: sessionIds } }).then(() => {
            Session.deleteMany({ cinema: req.params.id }).then(() => {
                Cinema.findByIdAndDelete(req.params.id).then((resp) => {
                    if (resp) return res.json(resp);
                    throw new Error();
                }).catch((err) => {
                    console.log(err);
                    res.status(500).send({ error: "Impossible de supprimer ce cinema." });
                });
            }).catch((err) => {
                console.log(err);
                res.status(500).send({ error: "Impossible de supprimer les sessions de ce cinema." });
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ error: "Impossible de supprimer les réservations de ce cinema." });
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ error: "Impossible de trouver les sessions de ce cinema." });
    });
};

/**
 * Met à jour un Cinema
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.update = function (req, res, next) {
    Cinema.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((resp) => {
        if (resp) return res.json(resp);
        throw new Error();
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({ error: "Impossible de mettre à jour les données ce cinema." });
    });
}
