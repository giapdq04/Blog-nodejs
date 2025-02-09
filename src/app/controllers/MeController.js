const { multipleMongooseObject, mongooseToObject } = require('../../util/mongoose');
const Course = require('../models/Course')

class MeController {

  // [GET] /me/stored/courses
  async storedCourses(req, res, next) {
    try {

      let courses = await Course.find();

      if (req.query.hasOwnProperty('_sort')) {
        courses = courses.sort({
          [req.query.column]: req.query.type
        })
      }

      const deletedCourses = await Course.countDocumentsWithDeleted(
        { deleted: true }
      );

      const convertCourses = multipleMongooseObject(courses).map(course => ({
        ...course,
        updatedAt: course.updatedAt.toLocaleString()
      }))

      res.render('me/stored-courses', {
        courses: convertCourses,
        deletedCourses
      });
    } catch (error) {
      next(error);
    }
  }

  // [GET] /me/trash/courses
  async trashCourses(req, res, next) {
    try {
      const courses = await Course.findWithDeleted({ deleted: true });

      const convertCourses = multipleMongooseObject(courses).map(course => ({
        ...course,
        deletedAt: course.deletedAt.toLocaleString()
      }))

      res.render('me/trash-courses', {
        courses: convertCourses
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MeController();
