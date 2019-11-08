const usersModel = require('../models/Users');
const usersCtrl = {}

usersCtrl.getData= async (req, res) => {
    res.json(await usersModel.find());
}

module.exports = usersCtrl;