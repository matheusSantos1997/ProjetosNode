const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter: (req, file, next) => {
        const allowed = ['image/jpeg', 'image/jpg', 'image/png']; // mimitipe  
        if (allowed.includes(file.mimetype)) {
            next(null, true);
        } else {
            next({ message: 'Arquivo não suportado' }, false);
        }
    }
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async(req, res, next) => {
    if (!req.file) {
        next();
        return;
    }

    // pegando a extensao do arquivo selecionado
    const ext = req.file.mimetype.split('/')[1];
    let filename = `${uuid.v4()}.${ext}`;

    req.body.photo = filename;

    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800, jimp.AUTO); // vai redimencionar para 800 de largura a imagem
    await photo.write(`./public/upload/${filename}`); // diretorio onde vai ser salvo a imagem
    next();

};