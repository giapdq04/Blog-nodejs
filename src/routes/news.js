const express = require('express')
const router = express.Router()
const newsCtrl = require('../app/controllers/NewController')

router.use('/:slug', newsCtrl.show)
router.use('/', newsCtrl.index)

module.exports = router