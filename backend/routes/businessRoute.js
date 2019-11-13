const express = require('express');
const router = express.Router();

const bsnCtrl = require('../controllers/businessCtrl');

router.post('/create', bsnCtrl.create);
router.get('/Info/:id', bsnCtrl.create);

module.exports = router;