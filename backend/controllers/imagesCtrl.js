const imgModel = require('../models/Images');
const imagesCtrl = {};

imagesCtrl.upload = async (req, res) => {
    if( req.file == undefined ){
        res.json({
            "result":"Error - El archivo no ha podido ser subido, verifique que sea imagen."
        });
    }else{
         let data = new imgModel({
            dateUploaded : new Date(),
            imgUrl: req.file.path,
            entityType: req.body.entityType,
            entityId: req.body.entityId
        });
        await data.save();
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