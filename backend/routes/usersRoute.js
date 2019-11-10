const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/usersCtrl');

router.post('/Register', userCtrl.insertData);
router.post('/Login', userCtrl.login);
router.get('/profile', userCtrl.authT, userCtrl.tokenC);

module.exports = router; 