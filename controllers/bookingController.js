let Booking = require('../models/bookingModel');

/**
 * Retourne toutes les réservations
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.readAll = function (req, res, next) {
    Booking.find({}).populate(
        ({
        path : 'session',
        populate : {
          path : 'film cinema'
        }
      })
      ).populate('user')
        .then((resp) => {
            if (resp) return res.json(resp);
            throw new Error();
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ error: "Impossible de lire les informations des réservations." });
        });
}

/**
 * Retourne les données d'une réservation en fonction de son id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.read = function (req, res, next) {
    Booking.findById(req.params.id).populate(
        ({
        path : 'session',
        populate : {
          path : 'film cinema'
        }
      })
    ).populate('user')
        .then((resp) => {
            if (resp) return res.json(resp);
            throw new Error();
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ error: "Impossible de lire les informations de cette réservation." });
        });
};

/**
 * Création d'une réservation
 * Retourne les données de celui-ci
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.create = function (req, res, next) {
    Booking.create(req.body).then((resp) => {
        if (resp) return res.json(resp);
        throw new Error();
    })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ error: "Impossible de créer cette réservation." })
        })
}

/**
 * Supprime une réservation
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.delete = function (req, res, next) {
    Booking.findByIdAndDelete(req.params.id).then((resp) => {
        if (resp && (resp.user._id !== req.decoded._id && !req.decoded.is_admin)) {
            return res.status(403).send({ error: "Vous n'avez pas les droits pour supprimer cette réservation." });
        }
        if (resp) return res.json(resp);
        throw new Error();
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ error: "Impossible de supprimer cette réservation." });
    });
};

/**
 * Met à jour une réservation
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.update = function (req, res, next) {
    Booking.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((resp) => {
        if (resp && (resp.user._id.toString() !== req.decoded._id && !req.decoded.is_admin)) {
            return res.status(403).send({ error: "Vous n'avez pas les droits pour mettre à jour cette réservation." });
        }
        if (resp) return res.json(resp);
        throw new Error();
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({ error: "Impossible de mettre à jour les données ce réservations." });
    });
}
