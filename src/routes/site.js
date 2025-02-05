const express = require('express')
const router = express.Router()
const siteCtrl = require('../app/controllers/SiteController')

router.use('/search', siteCtrl.search)
router.use('/', siteCtrl.index)

module.exports = router