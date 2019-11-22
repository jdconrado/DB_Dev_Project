const orderDetModel = require('../models/OrderDetail');
const orderDetCtrl = {};

orderDetCtrl.create = async (req, res) =>{
    let orderId = req.body.orderId;
    let {productId, price, quantity}=req.body.details;
    let data = new orderDetModel({
        orderId:orderId,
        productId:productId,
        price:price,
        quantity:quantity,
        total:quantity*price
    });
    await data.save(); 

}

orderDetCtrl.fetch = async (req, res) =>{
    let data = await orderDetModel.find({orderId: req.params.id});
    res.json({
        "ordersDet":data
    });
}

module.exports = orderDetCtrl;