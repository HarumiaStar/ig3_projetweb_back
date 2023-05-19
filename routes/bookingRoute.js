const express = require('express');
const router = express.Router();
const controller = require("../controllers/bookingController")
const verifyToken = require("./middleware/token");

/**
 * Routes au format CRUD
 */
//  GET tous les réservations
router.get('/', verifyToken, controller.readAll);
//  GET une réservation en fonction de son id
router.get('/:id', verifyToken, controller.read);
//  POST pour créer une réservation
router.post('/', verifyToken,  controller.create);
//  PUT pour mettre à jour une réservation en fonction de son id
router.put('/:id', verifyToken, controller.update);
//  DELETE pour supprimer une réservation en fonction de son id
router.delete('/:id', verifyToken, controller.delete);

module.exports = router;
