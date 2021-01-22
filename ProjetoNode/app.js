// configuraçao do servidor
const express = require('express'); // importa o express
const mustache = require('mustache-express'); // importa o mustache
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

app.use((req, res, next) => {
    res.locals.h = helpers;
    next();
});

app.use(express.json());

app.use('/', router); // permiti o uso de rotas

app.use(errorHandler.notFound);

app.engine('mst', mustache(__dirname + '/views/partials', '.mst')); // extensao do arquivo mustache
app.set('view engine', 'mst');
app.set('views', __dirname + '/views');

module.exports = app;