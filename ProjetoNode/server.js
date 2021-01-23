const mongoose = require('mongoose'); // usando a dependencia mongoose

// usando a dependencia dotenv
require('dotenv').config({ path: 'variables.env' });

// criando string de conexao com o mongoDB
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise; // permite o mongoose usar ecms6
mongoose.connection.on('error', (error) => {
    console.error('ERRO: ' + error.message);
});

// Crregando todos os models
require('./models/Post');

const app = require('./app'); // importando a aplicaçao
app.set('port', process.env.PORT || 3000);

// vai ouvir a porta
const server = app.listen(app.get('port'), () => {
    console.log(`Servidor rodando na porta: ${server.address().port}`);
});