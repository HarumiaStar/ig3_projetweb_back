const express = require('express');
const router = express.Router();
const controller = require("../controllers/filmController")
const verifyToken = require("./middleware/token");

/**
 * Routes au format CRUD
 */
//  GET tous les films
router.get('/', verifyToken, controller.readAll);
//  GET un film en fonction de son id
router.get('/:id', verifyToken, controller.read);
//  POST pour créer un film
router.post('/', verifyToken,  controller.create);
//  PUT pour mettre à jour un film en fonction de son id
router.put('/:id', verifyToken, controller.update);
//  DELETE pour supprimer un film en fonction de son id
router.delete('/:id', verifyToken, controller.delete);

module.exports = router;
