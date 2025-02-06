const express = require('express');
const router = express.Router();
const siteCtrl = require('../app/controllers/SiteController');

router.get('/search', siteCtrl.search);
router.get('/', siteCtrl.index);

module.exports = router;
