const Note = require('../models/Note');

module.exports = {
     ping: (req, res) => {
         res.json({pong: true});
     },

     all: async (req, res) => {
         let json = { error: '', result:[]};
         
         let notes = await Note.getAll();
         
         for(let i in notes) {
             json.result.push({
                 id: notes[i].id,
                 titulo: notes[i].titulo,
                 corpo: notes[i].corpo
             });
         }

         res.json(json);
     },

     one: async (req, res) => {
         let json = { error: '', result:{}};

         let id = req.params.id;
         let note = await Note.findById(id);

         if (note) {
             json.result = note;
         }

         res.json(json);
     },

     new: async (req, res) => {
        let json = {error:'', result:{}};

        let titulo = req.body.titulo;
        let corpo = req.body.corpo;

        if (titulo && corpo){

            let noteId = await Note.add(titulo, corpo);

            json.result = {
                id: noteId,
                titulo: titulo,
                corpo: corpo
            };
             
        }else {
            json.error = 'Campos não enviados';
        }

        res.json(json);
     },
    
     edit: async (req, res) => {
        let json = {error:'', result:{}};

        let id = req.params.id;
        let titulo = req.body.titulo;
        let corpo = req.body.corpo;

        if (id && titulo && corpo){

            await Note.update(id, titulo, corpo);

            json.result = {
                id: id,
                titulo: titulo,
                corpo: corpo
            };
             
        }else {
            json.error = 'Campos não enviados';
        }

        res.json(json);
     },

     delete: async (req, res) => {
         
     }
}