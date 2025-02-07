const express = require('express');
const router = express.Router();
const CourseCtrl = require('../app/controllers/CourseController');

router.get('/create', CourseCtrl.create);
router.post('/store', CourseCtrl.store);
router.get('/:id/edit', CourseCtrl.edit);
router.put('/:id', CourseCtrl.update);
router.get('/:slug', CourseCtrl.show);

module.exports = router;