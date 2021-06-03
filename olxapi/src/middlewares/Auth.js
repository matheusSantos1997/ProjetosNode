const User = require('../models/User');

module.exports = {
    private: async (req, res, next) => {
        // verificando o login
        if (!req.query.token && !req.body.token) {
            res.json({notallowed: true});
            return;
        }

        // preenchendo o token
        let token = '';
        if(req.query.token) {
           token = req.query.token;
        }

        if(req.body.token) {
            token = req.body.token;
        }

        if (token == '') {
            res.json({notallowed: true});
            return;
        }

        // verificando se o token pe válido
        const user = await User.findOne({token});
        
        // nao encontrou o usuario
        if (!user) {
            res.json({notallowed: true});
            return;
        }

        next();
    }
}