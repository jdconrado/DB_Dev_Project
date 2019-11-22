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
        vendorId: req.bdy.vendorId
    });

    await requests.post("http://localhost:8080/ORDERS/DETAILS/create/", {json: {orderId: order._id , details : req.body.products}} );
    
}

orderCtrl.fetchS = async (req, res) =>{
    let data = await orderModel.find({vendorId: req.body.SalesPersonId});
    await requests.post("http://localhost:8080/ORDERS/DETAILS/fetch/", {json: {orderId: data.orderId}},function (err, es, json) {
        if (err) {
          throw err;
        }
            res.json({
                'orders':data,
                'orderDet':json
            });
      });
}

orderCtrl.fetchC = async (req, res) =>{
    let data = await orderModel.find({clientId: req.body.clientId});
    await requests.post("http://localhost:8080/ORDERS/DETAILS/fetch/", {json: {orderId: data.orderId}},function (err, es, json) {
        if (err) {
          throw err;
        }
        res.json({
            'orders':data,
            'orderDet':json
        });
      } );
}

module.exports = orderCtrl;
