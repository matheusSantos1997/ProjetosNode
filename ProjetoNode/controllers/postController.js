const mongoose = require('mongoose');
const slug = require('slug');
const Post = mongoose.model('Post');

exports.view = async(req, res) => {
    const post = await Post.findOne({ slug: req.params.slug });
    res.render('view', { post });
}

exports.add = (req, res) => {
    res.render('addPost');
}

// recebimento dos dados e salvando no banco de dados
exports.addAction = async(req, res) => {
    // res.json(req.body); // recebe os dados
    req.body.tags = req.body.tags.split(',').map(tag => tag.trim());
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

// editando as informaçoes
exports.edit = async(req, res) => {
    // 1. Pegar as informações do post em questão
    const post = await Post.findOne({ slug: req.params.slug });
    // 2. Carregar o formulário de edição
    res.render('postEdit', { post });
};

exports.editAction = async(req, res) => {
    req.body.slug = slug(req.body.title, { lower: true });
    req.body.tags = req.body.tags.split(',').map(tag => tag.trim());

    try {
        // procurar o item enviado
        const post = await Post.findOneAndUpdate({ slug: req.params.slug }, req.body, {
            new: true,
            runValidators: true // nao permite enviar campos vazios
        });
    } catch (error) {
        req.flash('error', 'Ocorreu um erro! tente novamente mais tarde!');
        return res.redirect('/post/' + req.params.slug + '/edit');
    }
    req.flash('success', 'Post atualizado com sucesso!');

    res.redirect('/');
};