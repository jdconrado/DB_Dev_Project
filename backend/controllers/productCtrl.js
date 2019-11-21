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

productCtrl.getProAll = async(req, res)=>{
    let data = await prdtModel.find({SalesPersonId: req.body.SalesPersonId});
    res.json({
        data
    });
}

productCtrl.modify = async (req, res) =>{
    let data = await prdtModel.findById(req.params.id);
    let {name, price, available, imageId} = req.body;
    await data.updateOne(
        {name: name},
        {strict:false}
    );
    await data.updateOne(
        {price: price},
        {strict:false}
    );
    await data.updateOne(
        {available: available},
        {strict:false}
    );
    await data.updateOne(
        {imageId: imageId},
        {strict:false}
    );
    await data.save();
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