const pstModel = require('../models/Posts');
const postsCtrl = {};

postsCtrl.create = async(req, res) => {
    let date = new Date();
    let time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    let {postInfo, businessId, salesPId}= req.body;
    let data = new pstModel({
        'date':date,
        'time':time,
        'postInfo':postInfo,
        'businessId':businessId,
        'salesPId':salesPId
    });
    await data.save();
    res.json({
       "result":"Successful.",
       "id": data._id
    });
};

postsCtrl.fetchAll = async (req, res) =>{
    let data = await pstModel.find();
    res.json({
        "result":"Successful.",
        data
    });
};

postsCtrl.getData = async (req, res)=>{
    let data = await pstModel.findById(req.params.id);
    res.json({
        "result":"Successful.",
        data
    });
};

module.exports = postsCtrl;