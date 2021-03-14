const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.index = async(req, res) => {

    let responseJson = {
        pageTitle: 'HOME',
        posts: [],
        tags: [],
        tag: ''
    };

    console.log(req.user);

    responseJson.tag = req.query.t;
    const postFilter = (typeof responseJson.tag != 'undefined') ? { tags: responseJson.tag } : {};

    // console.log(typeof responseJson.tag);

    // pegando a lista de tags
    const tagsPromise = Post.getTagsList();
    // pega a lista de posts cadrastrados
    const postsPromise = Post.find(postFilter);

    // criando um crupo de promessas que vai executar as duas query ao mesmo tempo
    // const result = await Promise.all([tagsPromise, postsPromise]);
       const [ tags, posts ] = await Promise.all([tagsPromise, postsPromise]);

    // const tags = result[0];
    // const posts = result[1];

    for (let i in tags) {
        if (tags[i]._id == responseJson.tag) {
            tags[i].class = 'selected';
        }
    }
    responseJson.tags = tags;
    responseJson.posts = posts;

    res.render('home', responseJson);
}