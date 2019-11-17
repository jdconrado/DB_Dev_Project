const cmtModel = require('../models/Comment');
let requests = require('request');
const commentCtrl = {};

commentCtrl.create = async(req, res) => {
    let date = new Date();
    let time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    let {comment, userId, orderId, subCommentId}= req.body;
    let data = new cmtModel({
        'date':date,
        'time':time,
        'subCommentId':subCommentId,
        'comment':comment,
        'userId':userId,
        'orderId':orderId
    });
    await data.save();
    res.json({
       "result":"Successful.",
       data
    });
};
commentCtrl.getData = async(req, res)=>{
     let data = await cmtModel.findById(req.params.id);
     res.json({
         "Comment":data.comment
     });
};

module.exports = commentCtrl;