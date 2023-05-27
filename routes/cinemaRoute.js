const express = require('express');
const router = express.Router();
const controller = require("../controllers/cinemaController")
const verifyToken = require("./middleware/token");
const adminOnly = require("./middleware/adminOnly");

/**
 * Routes au format CRUD
 */
//  GET tous les cinémas
router.get('/', verifyToken, controller.readAll);
//  GET un cinéma en fonction de son id
router.get('/:id', verifyToken, controller.read);
//  POST pour créer un cinéma
router.post('/', verifyToken, adminOnly, controller.create);
//  PUT pour mettre à jour un cinéma en fonction de son id
router.put('/:id', verifyToken, adminOnly, controller.update);
//  DELETE pour supprimer un cinéma en fonction de son id
router.delete('/:id', verifyToken, adminOnly, controller.delete);

module.exports = router;
