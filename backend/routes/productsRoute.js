const express = require('express');
const router = express.Router();

const prdtCtrl = require('../controllers/productCtrl');

router.post('/create', prdtCtrl.create);
router.get('/fetch/', prdtCtrl.fetchAll);
router.get('/fetch/:id', prdtCtrl.fetch);
router.get('/fetch/:id/price', prdtCtrl.fetchPrice);
router.put('/update/:id', prdtCtrl.modify);
router.delete('/delete/', prdtCtrl.deleteByCond);
router.delete('/delete/:id', prdtCtrl.delete);
router.get('/getprodcts/', prdtCtrl.getProAll);

module.exports = router;