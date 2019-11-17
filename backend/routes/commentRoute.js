const express = require('express');
const router = express.Router();

const cmtCtrl = require('../controllers/commentCtrl.js');

router.post('/create', cmtCtrl.create);
router.get('/Info/:id', cmtCtrl.getData);

module.exports = router;