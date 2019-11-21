const cltModel = require('../models/Clients');
let requests = require('request');
const clientCtrl = {};

clientCtrl.create = async(req, res) => {
    let data = new cltModel(req.body);
    await data.save();
    res.json({
       "result":"Successful.",
       "id": data._id
    });
};
clientCtrl.getData = async(req, res)=>{
     requests.get('http://localhost:8080/USERS/Info/'+req.params.id,{json: true},function (err, es, json) {
        if (err) {
          throw err;
        }
            res.json(json);
      });
};

spCtrl.giveId = async (req, res)=>{
  let data = await cltModel.find({userId:req.params.id});
  res.json({
      "result":"Successful.",
      "id":data._id
  });
}

clientCtrl.bought = async(req,res)=>{
      let cc = await cltModel.findById(req.params.id);
      let p = await cltModel.find({_id: req.params.id, OrdersCount: {$exists: true}});
      if(p.length==0) {
        await cc.updateOne({OrdersCount:1}, {strict:false});
        await cc.save();
      }else{
        await cc.updateOne({$inc: {'OrdersCount': 1}},{strict:false});
        await cc.save();
      }
      res.json(cc);
};

clientCtrl.getRated = async(req, res)=>{
      let cl = await cltModel.findById(req.params.id);
      let p = await cltModel.find({_id: req.params.id, rating: {$exists: true}});
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

module.exports = clientCtrl;