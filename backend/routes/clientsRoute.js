const express = require('express');
const router = express.Router();

const cltCtrl = require('../controllers/clientCtrl.js');

router.post('/create', cltCtrl.create);
router.get('/Info/:id', cltCtrl.getData);

module.exports = router;