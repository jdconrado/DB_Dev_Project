const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/ratingCtrl');

router.post('/Create/:id', userCtrl.createData);

module.exports = router; 