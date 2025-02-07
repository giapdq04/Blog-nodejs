const { multipleMongooseObject } = require('../../util/mongoose');
const Course = require('../models/Course')

class MeController {

  // [GET] /me/stored/courses
  async storedCourses(req, res, next) {
    try {
      const courses = await Course.find({});

      res.render('me/stored-courses', {
        courses: multipleMongooseObject(courses)
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MeController();
