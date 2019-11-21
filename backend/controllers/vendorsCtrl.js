const spModel = require('../models/SalesPerson');
let requests = require('request');
const spCtrl = {};

spCtrl.create = async (req, res) =>{
    let data = new spModel(req.body);
    await data.save();
    res.json({
       "result":"Successful.",
       "id": data._id
    });
};

spCtrl.modify = async (req, res) =>{
    let data = await spModel.findById(req.params.id);
    let description = req.body.description;
    await data.updateOne(
        {description: description},
        {strict:false}
    );
    await data.save();
    var js={
        "userId":data.userId,
        "name":req.body.name, 
        "lastname":req.body.lastname, 
        "email":req.body.email, 
        "phone":req.body.phone, 
        "DateOfBirth":req.body.DateOfBirth, 
        "ImageID":req.body.ImageID}
    requests.post('http://localhost:8080/USERS/modify', {json: js});
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
    var js={"SalesPersonId":req.params.id};
    await requests.delete("http://localhost:8080/PRODUCTS/delete/", {json: js} );
    res.json({
        "result":"Successful."
    });
};

spCtrl.bought = async(req,res)=>{
    let cc = await spModel.findById(req.params.id);
    let p = await spModel.find({_id: req.params.id, OrdersCount: {$exists: true}});
    if(p.length==0) {
      await cc.updateOne({OrdersCount:1}, {strict:false});
      await cc.save();
    }else{
      await cc.updateOne({$inc: {'OrdersCount': 1}},{strict:false});
      await cc.save();
    }
    res.json(cc);
};

spCtrl.getRated = async(req, res)=>{
    let cl = await spModel.findById(req.params.id);
    let p = await spModel.find({_id: req.params.id, rating: {$exists: true}});
    let rt = req.body.rating;
    if(p.length==0) {
      await cl.updateOne({rating: rt}, {strict:false});
      await cl.updateOne({ratingsCount:1}, {strict:false});
      await cl.save();
    }else{
        rt=((cl.rating*cl.ratingsCount)+rt)/(cl.ratingsCount+1);
        await cl.updateOne({rating: rt}, {strict:false});
        await cl.updateOne({$inc: {'ratingsCount': 1}},{strict:false});
        await cl.save();
    }
    res.json(cl);
}


module.exports = spCtrl;