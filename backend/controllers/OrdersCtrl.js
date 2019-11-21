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

    await requests.post("http://localhost:8080/ORDERS/DETAILS/create/", {json: {orderId: order._id , details : req.body.details}} );
    
}

module.exports = orderCtrl;
