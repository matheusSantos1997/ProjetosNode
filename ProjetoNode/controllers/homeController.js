const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.index = async(req, res) => {

    let responseJson = {
        pageTitle: 'HOME',
        posts: []
    }

    const tags = await Post.getTagsList();
    responseJson.tags = tags;

    // pega a lista de posts cadrastrados
    const posts = await Post.find();
    responseJson.posts = posts;

    res.render('home', responseJson);
}