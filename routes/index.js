const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* POST reset-password */
router.post('/reset-password', userController.resetPassword);
/* POST /reset-password/:token */
router.post('/reset-password/:token', userController.resetPasswordToken);

module.exports = router;
