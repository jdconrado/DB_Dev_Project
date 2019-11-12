const imgModel = require('../models/Images');
const fs = require('fs');
const imagesCtrl = {};

imagesCtrl.upload = async (req, res) => {
    if( req.file == undefined ){
        res.json({
            "result":"Error - El archivo no ha podido ser subido, verifique que sea imagen."
        });
    }else{
         let data = new imgModel({
            dateUploaded : new Date(),
            imgData: fs.readFileSync(req.file.path),
            imgType: req.file.mimetype,
            entityType: req.body.entityType,
            entityId: req.body.entityId
        });
        await data.save();
        fs.unlinkSync(req.file.path);
        res.json({
            "id": data._id,
            "result":"Successful."
        }); 
    }
};

imagesCtrl.fetch = async (req, res) => {
    let data = await imgModel.findById(req.params.id);
    res.json({"result":"Successful.", data});
};

imagesCtrl.delete = async (req, res) => {
    await imgModel.deleteOne({_id: req.params.id});
    res.json({
        "result":"Successful."
    });
};

module.exports = imagesCtrl;