const express = require('express');
const router = express.Router();

const bsnCtrl = require('../controllers/businessCtrl');

router.post('/create', bsnCtrl.create);
router.get('/Info/:id', bsnCtrl.getData);
router.put('/Rate/:id', bsnCtrl.getRated);
router.get('/fetch/', bsnCtrl.fetchAll);

module.exports = router;