const rtModel = require('../models/Rating');
const rtCtrl = {};

let requests = require('request');

rtCtrl.createData = async (req, res) =>{
    let date=new Date();
    let entityId = req.params.id;
    let time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    const found = await rtModel.findOne({userId: req.body.userId, entityId: entityId});
    let {rating, entityType, userId, commentId}=req.body;
    if(found){
        res.json({
            "status":"Already rated by this user."
        });
    }else{
        let data = new rtModel({
            'date':date,
            'time':time,
            'rating':rating,
            'entityType':entityType,
            'entityId':entityId,
            'userId':userId,
            'commentId':commentId
        });
        await data.save();
        var js={"rating":rating};
        if(entityType.localeCompare("Business")==0){
            requests.put('http://localhost:8080/USERS/VENDORS/BUSINESS/Rate/'+entityId, {json: js});
        }else if(entityType.localeCompare("Client")==0){
            requests.put('http://localhost:8080/USERS/CLIENTS/Rate/'+entityId, {json: js});
        }else{
            requests.put('http://localhost:8080/USERS/VENDORS/Rate/'+entityId, {json: js});
        }
        res.json({
        "result":"Successful.",
        "id": data._id
        });
    }
};

module.exports = rtCtrl;