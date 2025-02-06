const express = require('express');
const router = express.Router();
const newsCtrl = require('../app/controllers/NewController');

router.get('/:slug', newsCtrl.show);
router.get('/', newsCtrl.index);

module.exports = router;
