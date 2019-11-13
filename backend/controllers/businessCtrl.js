const bsnModel = require('../models/Business');
const businessCtrl = {};

businessCtrl.create = async(req, res) => {
    let data = new bsnModel(req.body);
    await data.save();
    res.json({
       "result":"Successful.",
       "id": data._id
    });
};

businessCtrl.getData = async (req, res)=>{
    let data = await bsnModel.findById(req.params.id);
    res.json({
        "result":"Successful.",
        data
    });
};
module.exports = businessCtrl;