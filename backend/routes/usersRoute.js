const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/usersCtrl');

router.get('/', userCtrl.getData);

module.exports = router; 