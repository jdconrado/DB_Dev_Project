const express = require('express');
const router = express.Router();

const bsnCtrl = require('../controllers/businessCtrl');

router.post('/create', bsnCtrl.create);
router.get('/Info/:id', bsnCtrl.create);
router.put('/bought/:id', bsnCtrl.bought);
router.put('/Rate/:id', bsnCtrl.getRated);

module.exports = router;