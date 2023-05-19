const express = require('express');
const router = express.Router();
const controller = require("../controllers/sessionController")
const verifyToken = require("./middleware/token");

/**
 * Routes au format CRUD
 */
//  GET tous les scéances
router.get('/', verifyToken, controller.readAll);
//  GET une scéance en fonction de son id
router.get('/:id', verifyToken, controller.read);
//  POST pour créer une scéance
router.post('/', verifyToken,  controller.create);
//  PUT pour mettre à jour une scéance en fonction de son id
router.put('/:id', verifyToken, controller.update);
//  DELETE pour supprimer une scéance en fonction de son id
router.delete('/:id', verifyToken, controller.delete);

module.exports = router;
