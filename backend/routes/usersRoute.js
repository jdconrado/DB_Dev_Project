const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/usersCtrl');

router.post('/register', userCtrl.insertData);
router.post('/login', userCtrl.login);
router.put('/modify/:id', userCtrl.modify);
router.get('/info/:id', userCtrl.getData); // dejar para sacar info de vendors
module.exports = router; 