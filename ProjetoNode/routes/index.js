const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
    let obj = {
        pageTitle: "Teste 123"
    }

    res.render('home', obj);
});

module.exports = router;