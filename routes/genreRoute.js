const express = require('express');
const router = express.Router();
const controller = require("../controllers/genreController")
const verifyToken = require("./middleware/token");

/**
 * Routes au format CRUD
 */
//  GET tous les genres
router.get('/', verifyToken, controller.readAll);
//  GET un genre en fonction de son id
router.get('/:id', verifyToken, controller.read);
//  POST pour créer un genre
router.post('/', verifyToken,  controller.create);
//  PUT pour mettre à jour un genre en fonction de son id
router.put('/:id', verifyToken, controller.update);
//  DELETE pour supprimer un genre en fonction de son id
router.delete('/:id', verifyToken, controller.delete);

module.exports = router;
