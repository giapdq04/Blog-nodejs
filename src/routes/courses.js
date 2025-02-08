const express = require('express');
const router = express.Router();
const CourseCtrl = require('../app/controllers/CourseController');

router.get('/create', CourseCtrl.create);
router.post('/store', CourseCtrl.store);
router.post('/handle-form-actions', CourseCtrl.handleFormActions);
router.post('/trash/handle-form-actions', CourseCtrl.handleTrashFormActions);
router.get('/:id/edit', CourseCtrl.edit);
router.put('/:id', CourseCtrl.update);
router.patch('/:id/restore', CourseCtrl.restore);
router.delete('/:id', CourseCtrl.delete);
router.delete('/:id/force', CourseCtrl.forceDelete);
router.get('/not-found-course', CourseCtrl.notFoundCourse);
router.get('/:slug', CourseCtrl.show);

module.exports = router;