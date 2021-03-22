const User = require('../models/User');
const crypto = require('crypto');

exports.login = (req, res) => {
    res.render('login');
};

exports.loginAction = (req, res) => {
    const auth = User.authenticate();

    auth(req.body.email, req.body.password, (error, result) => {
        
        if(!result) {
            req.flash('error', 'Seu Email e/ou senha estão errados!');
            res.redirect('/users/login');
            return;
        } else {
            // vai conseguir logar
            req.login(result, () => {});

            req.flash('success', 'Você foi logado com sucesso!');
            res.redirect('/');
        }
    });
};

exports.register = (req, res) => {
     res.render('register');
};

exports.registerAction = (req, res) => {
    
    const newUser = new User(req.body);

    User.register(newUser, req.body.password, (error) => {
       if(error) {
           req.flash('error', 'Ocorreu um erro, tente mais tarde.');
           console.log('Erro ao registrar: ', error);
           res.redirect('/users/register');
           return;
       }
       
       req.flash('success', 'Registro efetuado com sucesso. Faça o login.');
       res.redirect('/users/login');
    });
}

exports.logout = (req, res) => {
     req.logout();
     res.redirect('/');
};

// esqueci minha senha
exports.forget = (req, res) => {
     res.render('forget');
}

exports.forgetAction = async (req, res) => {
    // 1. Verificar se o usuário realmente existe.
    const user = await User.find({email:req.body.email}).exec(); // vai procurar o email
    
    if(!user) {
        req.flash('error', 'E-mail não cadaastrado.');
        res.redirect('/users/forget');
        return;
    } 
    
    // 2. Gerar um token (com data de expiração) e salvar no banco

    // gera o token aleatório
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora

    await user.save(); // salva no banco

    // 3. Gerar link (com token) para trocar a senha 
    const resetLink = `http://${req.headers.host}/users/reset/${user.resetPasswordToken}`;

    req.flash('success', 'Te enviamos um e-mail com instruções.' + resetLink);
    res.redirect('/users/login');

    // 4. Enviar o link via e-email para o usuário
    

    // 5. Usuário vai acessar o link e trocar a senha.
}