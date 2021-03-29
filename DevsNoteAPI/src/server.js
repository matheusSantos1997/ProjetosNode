require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes/routes');

// criando o servidor
const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));
server.use('/api', routes);

server.listen(process.env.PORT, () => {
     console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});