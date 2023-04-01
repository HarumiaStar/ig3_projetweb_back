const express = require('express');
const router = express.Router();
const controller = require("../controllers/userController");

/* GET users listing. */
router.get('/', controller.readAll);
/* GET for a user. */
router.get('/:id', controller.read);
/* POST for creating a user */
router.post('/', controller.create);
/* PUT for updating a user */
router.put('/:id', controller.update);
/* DELETE for deleting a user */
router.delete('/:id', controller.delete);

module.exports = router;