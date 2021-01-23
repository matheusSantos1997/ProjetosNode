const express = require('express');
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

const router = express.Router();

router.get('/', homeController.index);
router.get('/users/login', userController.login);
router.get('/posts/add', postController.add);
router.post('/posts/add', postController.addAction);

module.exports = router;