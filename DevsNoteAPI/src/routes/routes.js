const express = require('express');
const router = express.Router();
const NoteController = require('../controllers/noteController');

// rota ping
router.get('/ping', NoteController.ping);

// GET /api/notes -> pega todas as notas (id, titulo)
// GET /api/note/123 -> pega informaçoes de UMA nota
// POST /api/note -> adicionar nota nova
// PUT /api/note/123 -> alterar uma nota
// DELETE /api/note/123 -> deletar uma nota

// end-points
router.get('/notes', NoteController.all);
router.get('/note/:id', NoteController.one);
router.post('/note', NoteController.new);
router.put('/note/:id', NoteController.edit);
router.delete('/note/:id', NoteController.delete);

module.exports = router;