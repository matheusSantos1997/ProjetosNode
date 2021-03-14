const express = require('express');
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const imageMiddleware = require('../middlewares/imageMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', homeController.index);

router.get('/users/login', userController.login);
router.post('/users/login', userController.loginAction);

router.get('/users/register', userController.register);
router.post('/users/register', userController.registerAction);
router.get('/users/logout', userController.logout);

router.get('/post/:slug', postController.view);

// rota de inserçao
router.get('/posts/add', authMiddleware.isLogged, postController.add);
router.post('/posts/add',
    authMiddleware.isLogged,
    imageMiddleware.upload,
    imageMiddleware.resize,
    postController.addAction);
// rota de ediçao
router.get('/post/:slug/edit', authMiddleware.isLogged, postController.edit);
router.post('/post/:slug/edit',
    authMiddleware.isLogged,
    imageMiddleware.upload,
    imageMiddleware.resize,
    postController.editAction);

module.exports = router;