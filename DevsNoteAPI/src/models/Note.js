const db = require('../db');

module.exports = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            
            db.query('SELECT * FROM notes', (error, results) => {
                 if(error) { reject(error); return; }
                 resolve(results);
            });

        });
    },

    findById: (id) => {
        return new Promise((resolve, reject) => {
            
            db.query('SELECT * FROM notes WHERE id = ?', [id], (error, results) => {
                 if (error) { reject(error); return }
                 
                 // verifica se existe um resultado
                 if (results.length > 0) {
                    resolve(results[0]);
                 } else {
                    resolve(false);
                 }
            });
     
        });
    },
    add: (titulo, corpo) => {
        return new Promise((resolve, reject) => {
             db.query('INSERT INTO notes (titulo, corpo) VALUES (?, ?)', 
             [titulo, corpo], (error, results) => {
                 if(error) { reject(error); return; }
                 
                 resolve(results.insertId);
             }
             
             );
        });
    },
    update: (id, titulo, corpo) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE notes SET titulo = ?, corpo = ?, WHERE id = ?',
            [titulo, corpo, id],
            (error, results) => {
                if (error) { reject(error); return; }
                resolve(results);
            })
        });
    }
};