const orderDetModel = require('../models/OrderDetail');
const orderDetCtrl = {};

orderDetCtrl.create = async (req, res) =>{
    let orderId = req.body.orderId;
    let {productId, price, quantity}=req.body.details;
    console.log(req.body);
    var total=parseInt(quantity)*parseInt(price);
    console.log(quantity);
    let data = new orderDetModel({
        orderId:orderId,
        productId:productId,
        price:price,
        quantity:quantity,
        total:total
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