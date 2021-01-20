// configuraçao do servidor
const express = require('express'); // importa o express
// rotas
const router = require('./routes/index');

// configuraçoes
const app = express();
app.use('/', router); // permiti o uso de rotas

app.use(express.json());

module.exports = app;