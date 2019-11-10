const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/usersCtrl');

router.get('/Register', userCtrl.insertData);
router.get('/Login', userCtrl.login);


module.exports = router; 