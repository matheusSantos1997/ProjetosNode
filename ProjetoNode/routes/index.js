const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {

    // res.json(req.query);
    res.send('testando...');

    // GET req.query
    // POST req.body
    // Parametros da url: req.paramns
});

/* router.get('/posts/:slug', (req, res) => {
    let slug = req.params.slug;

    res.send('slug do post: ' + slug);
});

router.get('/sobre', (req, res) => {
    res.send('Página Sobre!');
}); */

module.exports = router;