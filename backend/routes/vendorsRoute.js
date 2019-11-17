const express = require('express');
const router = express.Router();

const vendorCtrl = require('../controllers/vendorsCtrl');

router.post('/create', vendorCtrl.create);
router.get('/fetch/', vendorCtrl.fetchAll);
router.get('/fetch/:id', vendorCtrl.fetch);
router.put('/update/:id', vendorCtrl.modify);
router.put('/bought/:id', vendorCtrl.bought);
router.put('/Rate/:id', vendorCtrl.getRated);
router.delete('/delete/:id', vendorCtrl.delete);

module.exports = router;