// configuraçao do servidor
const express = require('express'); // importa o express
const mustache = require('mustache-express'); // importa o mustache
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const router = require('./routes/index'); // rotas
const helpers = require('./helpers');
const errorHandler = require('./handlers/errorHandler');

// middleware

/*
PROCESSO DE LOGIN:
- Requisição

*/


// configuraçoes
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public')); // torna a pasta public acessivel em qualquer parte do sistema

app.use(cookieParser(process.env.SECRET));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());


app.use(passport.initialize()); // iniciando o passport
app.use(passport.session()); // iniciando a sessao

// processo de autenticaçao e registro de usuarios
const User = require('./models/User'); // importando o model de User
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.h = helpers;
    res.locals.flashes = req.flash();
    res.locals.user = req.user;
    next();
});


app.use('/', router); // permiti o uso de rotas

app.use(errorHandler.notFound);

app.engine('ejs', mustache(__dirname + '/views/partials', '.ejs')); // extensao do arquivo mustache
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

module.exports = app;