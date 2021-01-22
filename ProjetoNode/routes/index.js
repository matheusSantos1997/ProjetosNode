const express = require('express');
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const registerController = require('../controllers/registerController');

const router = express.Router();

router.get('/', homeController.userMiddware, homeController.index);
router.get('/views/login', userController.login);
router.get('/views/register', registerController.register);

module.exports = router;