const express = require('express');
const router = express.Router();
const controller = require("../controllers/userController");
const verifyToken = require("./middleware/token");

/* GET users listing. */
router.get('/', verifyToken, controller.readAll);
/* GET for a user. */
router.get('/:id', verifyToken, controller.read);
/* POST for creating a user */
router.post('/', controller.create);
/* PUT for updating a user */
router.put('/:id', verifyToken, controller.update);
/* DELETE for deleting a user */
router.delete('/:id', verifyToken, controller.delete);
/* POST LOGIN */
router.post('/login', controller.login);

module.exports = router;