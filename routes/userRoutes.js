const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', userController.getUserInfo);

router.post('/register', authController.registerUser);
router.post('/login', authController.logInUser);

module.exports = router;
