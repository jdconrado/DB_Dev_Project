const orderModel = require('../models/orders');
const orderCtrl = {};

let requests = require('request');

orderCtrl.create = async (req, res) =>{
    let order = new orderModel({
        dateTime:new Date(),
        status:"PENDIENTE",
        lineTotal:0,
        clientId:req.body.clientId,
        businessId: req.body.businessId,
        vendorId: req.body.vendorId // 68468sdfsdf 8524685sdfsdf
    });

    await requests.post("http://localhost:8080/ORDERS/DETAILS/create/", {json: {orderId: order._id , details : req.body.products}} );
    res.json({
        "result":"Successful"
    })
}

orderCtrl.fetchS = async (req, res) =>{
    let data = await orderModel.find({vendorId: req.params.id});
    let det = [];
    data.forEach( async Element =>{
        requests.get("http://localhost:8080/ORDERS/DETAILS/fetch/"+Element.orderId,function (err, json) {
        if (err) {
          throw err;
        }
            det.push(json["ordersDet"]);
      });
    });
    res.json({
        'orders':data,
        'orderDet': det
    });
    
}

orderCtrl.fetchC = async (req, res) =>{
    console.log( req.params.id);
    let data = await orderModel.find({clientId: req.params.id});
    let det = [];
    data.forEach(async Element =>{
        await requests.get("http://localhost:8080/ORDERS/DETAILS/fetch/"+Element.orderId,function (err, json) {
        if (err) {
          throw err;
        }
            det.push(json["ordersDet"]);
      });
    });
    res.json({
        'orders':data,
        'orderDet':det
    });
}

module.exports = orderCtrl;
