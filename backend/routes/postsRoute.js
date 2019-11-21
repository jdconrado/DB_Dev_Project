const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/postCtrl');

router.post('/create', postCtrl.create);
router.get('/fetch/', postCtrl.fetchAll);
router.get('/fetch/:id', postCtrl.getData);

module.exports = router;