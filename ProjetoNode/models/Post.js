const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: 'O post precisa de um titulo'
    },
    slug: String,
    body: {
        type: String,
        trim: true
    },
    tags: [String] // vai ser um array com varias tags 
});

module.exports = mongoose.model('Post', postSchema);