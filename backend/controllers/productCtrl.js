const prdtModel = require('../models/Products');
const productCtrl = {};

productCtrl.create = async(req, res) => {
    let data = new prdtModel(req.body);
    await data.save();
    res.json({
       "result":"Successful.",
       "id": data._id
    });
};

productCtrl.modify = async (req, res) =>{
    await prdtModel.updateOne(
        {_id: req.params.id},
        {$set: req.body}
    );
    res.json({
        "result":"Successful."
    });
};

productCtrl.fetch = async (req, res) =>{
    let data = await prdtModel.findById(req.params.id);
    res.json({
        "result":"Successful.",
        data
    });
};

productCtrl.fetchPrice = async (req, res) =>{
    let data = await prdtModel.findById(req.params.id);
    res.json({
        "result":"Successful.",
        "price" : data.price
    });
};

productCtrl.fetchAll = async (req, res) =>{
    let data = await prdtModel.find();
    res.json({
        "result":"Successful.",
        data
    });
};

productCtrl.delete = async (req, res) =>{
    await prdtModel.deleteOne({_id: req.params.id});
    res.json({
        "result":"Successful."
    });
}

productCtrl.deleteByCond = async (req, res) =>{
    await prdtModel.deleteMany({SalesPersonId: req.body.SalesPersonId});
    res.json({
        "result":"Successful."
    });
}

module.exports = productCtrl;