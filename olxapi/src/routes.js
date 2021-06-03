const express = require('express');
const router = express.Router();

const Auth = require('./middlewares/Auth');

const AuthValidator = require('./validators/AuthValidator');

const AuthController = require('./controllers/AuthController');
const UserController = require('./Controllers/UserController');
const AdsController = require('./Controllers/AdsController');

// router.get('/ping', (req, res) => {
//     res.json({pong: true});
// });

// rota de todos os estados
router.get('/states', UserController.getStates);

// rotas de autenticaçao do usuario
router.post('/user/signin', AuthValidator.signin, AuthController.signin);
router.post('/user/signup', AuthValidator.signup, AuthController.signup);

// rotas do usuario
router.get('/user/me', Auth.private, UserController.info);
router.put('/user/me', Auth.private, UserController.editAction);

// rotas de anuncios
router.get('/categories', AdsController.getCategories);

router.post('/ad/add', Auth.private, AdsController.addAction);
router.get('/ad/list', AdsController.getList);
router.get('/ad/item', AdsController.getItem);
router.post('/ad/:id', Auth.private, AdsController.editAction);

module.exports = router;