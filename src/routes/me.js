const express = require('express');
const router = express.Router();
const MeCtrl = require('../app/controllers/MeController');

router.get('/stored/courses', MeCtrl.storedCourses);

module.exports = router;