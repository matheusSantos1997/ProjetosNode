// configuraçao do servidor
const express = require('express'); // importa o express
const mustache = require('mustache-express'); // importa o mustache
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');

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

app.use(cookieParser(process.env.SECRET));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

app.use((req, res, next) => {
    res.locals.h = helpers;
    res.locals.flashes = req.flash();
    next();
});

app.use('/', router); // permiti o uso de rotas

app.use(errorHandler.notFound);

app.engine('ejs', mustache(__dirname + '/views/partials', '.ejs')); // extensao do arquivo mustache
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

module.exports = app;