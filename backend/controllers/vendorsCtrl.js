const spModel = require('../models/SalesPerson');
const spCtrl = {};

let requests = require('request');

spCtrl.create = async (req, res) =>{
    let data = new spModel(req.body);
    await data.save();
    res.json({
       "result":"Successful.",
       "id": data._id
    });
};

spCtrl.modify = async (req, res) =>{
    await spModel.updateOne(
        {_id: req.params.id},
        {$set: req.body}
    );
    res.json({
        "result":"Successful."
    });
};

spCtrl.fetch = async (req, res) =>{
    let data = await spModel.findById(req.params.id);
    res.json({
        "result":"Successful.",
        data
    });
};

spCtrl.fetchAll = async (req, res) =>{
    let data = await spModel.find();
    res.json({
        "result":"Successful.",
        data
    });
};

spCtrl.delete = async (req, res) =>{
    await spModel.deleteOne({_id: req.params.id});

    await requests.delete("/PRODUCTS/delete/", {json:{SalesPersonId: _id}} );
    res.json({
        "result":"Successful."
    });
}

module.exports = spCtrl;