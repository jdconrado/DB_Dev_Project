const express = require('express');
const router = express.Router();

const cltCtrl = require('../controllers/clientCtrl.js');

router.post('/create', cltCtrl.create);
router.get('/Info/:id', cltCtrl.getData);
router.get('/giveid/:id',cltCtrl.giveId);
router.put('/bought/:id', cltCtrl.bought);
router.put('/Rate/:id', cltCtrl.getRated);

module.exports = router;