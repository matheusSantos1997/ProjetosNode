const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.add = (req, res) => {
    res.render('addPost');
}

// recebimento dos dados e salvando no banco de dados
exports.addAction = async(req, res) => {
    // res.json(req.body); // recebe os dados
    const post = new Post(req.body);

    try {
        await post.save();
    } catch (error) {
        req.flash('error', 'Erro: ' + error.message);
        return res.redirect('/posts/add');

    }


    req.flash('success', 'Post salvo com sucesso!');

    res.redirect('/');
}