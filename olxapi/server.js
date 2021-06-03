require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');

const apiRoutes = require('./src/routes');

// conexao com o banco de dados mongodb
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useFindAndModify: false, 
    useUnifiedTopology: true
}); 

mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
     console.log('Erro: ', error.message);
});

// criando o servidor
const server = express();
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(cors());
server.use(fileupload());

server.use(express.static(__dirname+'/public'));

server.use('/', apiRoutes);

server.listen(process.env.PORT, () => {
     console.log(`Rodando no endereço: ${process.env.BASE}`);
});