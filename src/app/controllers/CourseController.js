const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/mongoose')
class CourseController {

  // [GET] /course/:slug
  async show(req, res, next) {
    try {
      const course = await Course.findOne({
        slug: req.params.slug
      })

      res.render('courses/show', {
        course: mongooseToObject(course)
      })
    } catch (error) {
      next(error)
    }
  }

  // /courses/create [POST]
  create(req, res) {
    res.render('courses/create')
  }


  // /courses/store [POST]
  store(req, res, next) {
    const formData = req.body

    if (!formData.name || !formData.videoId) {
      return res.status(400).send('Tên khóa học và videoId là bắt buộc');
    }
    formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
    const course = new Course(formData)
    course.save()
      .then(() => res.redirect('/'))
      .catch(error => next(error))
  }

  // /courses/:id/edit [GET]
  async edit(req, res, next) {
    try {
      const course = await Course.findById(req.params.id)
      res.render('courses/edit', {
        course: mongooseToObject(course)
      })
    } catch (error) {
      next(error)
    }
  }

  //PUT /courses/:id
  async update(req, res, next) {
    const formData = req.body
    console.log('formData', formData);


    if (!formData.name || !formData.videoId) {
      return res.status(400).send('Tên khóa học và videoId là bắt buộc');
    }
    formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
    await Course.updateOne({
      _id: req.params.id
    }, formData)

      .then(() => res.redirect('/me/stored/courses'))
      .catch(error => next(error))
  }
}

module.exports = new CourseController();
