exports.userMiddware = (req, res, next) => {

    let info = { name: 'Matheus', id: 2 }

    req.userInfo = info;

    next();
};

exports.index = (req, res) => {
    let obj = {
        pageTitle: 'HOME',
        userInfo: req.userInfo
    };

    res.render('home', obj);
}