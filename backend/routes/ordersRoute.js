const express = require('express');
const router = express.Router();

const ordersCtrl = require('../controllers/OrdersCtrl');
const orDetCtrl = require('../controllers/orderDetailCtrl');

router.post('/create', ordersCtrl.create);
router.post('/DETAILS/create', orDetCtrl.create);
router.get('/fetchS/:id', ordersCtrl.fetchS);
router.get('/fetchC/:id', ordersCtrl.fetchC);
router.get('/DETAILS/fetch', orDetCtrl.fetch);

module.exports = router;
