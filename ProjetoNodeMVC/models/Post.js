const mongoose = require('mongoose');
const slug = require('slug');
mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
    photo: String,
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

// se o registro for salvo
postSchema.pre('save', async function(next) {

    // verifica se o titulo foi modificado
    if (this.isModified('title')) {
        this.slug = slug(this.title, { lower: true }); // lower vai converter tudo para minusculo


        //verificar no banco de dados se noa existe um slug com o mesmo nome
        const slugRegex = new RegExp(`^(${this.slug})((-[0-9]{1,}$)?)$`, 'i');

        const postsWithSlug = await this.constructor.find({ slug: slugRegex });

        if (postsWithSlug.length > 0) {
            this.slug = `${this.slug}-${postsWithSlug.length + 1}`;
        }
    }

    next();
});

postSchema.statics.getTagsList = function() {
    return this.aggregate([
        { $unwind: '$tags' },
        { $group: { _id: '$tags', count: { $sum: 1 } } }, // agrupando as tags
        { $sort: { count: -1 } }

    ]);
}

module.exports = mongoose.model('Post', postSchema);