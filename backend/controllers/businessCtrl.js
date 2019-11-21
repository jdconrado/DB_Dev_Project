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

businessCtrl.fetchAll = async (req, res) =>{
    let data = await bsnModel.find();
    res.json({
        "result":"Successful.",
        data
    });
};

businessCtrl.getData = async (req, res)=>{
    let data = await bsnModel.findById(req.params.id);
    res.json({
        "result":"Successful.",
        data
    });
};

businessCtrl.getRated = async(req, res)=>{
    let cl = await bsnModel.findById(req.params.id);
    let p = await bsnModel.find({_id: req.params.id, rating: {$exists: true}});
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
module.exports = businessCtrl;