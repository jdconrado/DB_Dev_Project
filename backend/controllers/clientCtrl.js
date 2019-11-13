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

module.exports = clientCtrl;