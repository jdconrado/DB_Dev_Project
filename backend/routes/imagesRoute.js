const express = require('express');
const router = express.Router();

const multer = require('multer');
const ups = multer({
    storage: multer.diskStorage({
        destination: (req,file,cb) =>{
            cb(null, './uploads/')
        },
        filename: (req,file,cb) =>{
            cb(null, new Date().toISOString().replace(/:/g,"-") + '_'+ file.originalname);
        }
    }) ,
    fileFilter: (req, file, cb)=>{
        if(file.mimetype.search('image') != -1){
            cb(null, true);
        }else{
            cb(null, false);
        }
    }
});

const imgCtrl = require('../controllers/imagesCtrl');

router.post('/upload', ups.single('imgFile'), imgCtrl.upload );
router.get('/fetch/:id', imgCtrl.fetch);
router.delete('/delete/:id', imgCtrl.delete);

module.exports = router;