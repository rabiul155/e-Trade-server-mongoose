const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.verifyToken, userController.getUserInfo);

router.post('/register', authController.registerUser);
router.post('/login', authController.logInUser);
router.get('/refreshToken', authController.getNewToken);

module.exports = router;
