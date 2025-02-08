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

    if (!req.body.name || !req.body.videoId) {
      return res.status(400).send('Tên khóa học và videoId là bắt buộc');
    }
    req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
    const course = new Course(req.body)
    course.save()
      .then(() => res.redirect('/me/stored/courses'))
      .catch(error => next(error))
  }

  // /courses/:id/edit [GET]
  async edit(req, res, next) {
    try {
      const course = await Course.findById(req.params.id)

      if (!course) {
        return res.redirect('/courses/not-found-course')
      }

      console.log('course123 ', course);


      res.render('courses/edit', {
        course: mongooseToObject(course)
      })
    } catch (error) {
      next(error)
    }
  }

  //PUT /courses/:id
  async update(req, res, next) {
    if (!req.body.name || !req.body.videoId) {
      return res.status(400).send('Tên khóa học và videoId là bắt buộc');
    }
    req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
    await Course.updateOne({
      _id: req.params.id
    }, req.body)

      .then(() => res.redirect('/me/stored/courses'))
      .catch(error => next(error))
  }

  // [DELETE] /courses/:id
  async delete(req, res, next) {
    try {
      await Course.delete({
        _id: req.params.id
      })

      res.redirect('back')
    } catch (error) {
      next(error)
    }
  }

  // [PATCH] /courses/restore
  async restore(req, res, next) {
    try {
      await Course.restore({
        _id: req.params.id
      })

      res.redirect('back')
    } catch (error) {
      next(error)
    }
  }

  async forceDelete(req, res, next) {
    try {
      await Course.deleteOne({
        _id: req.params.id
      })

      res.redirect('back')
    } catch (error) {
      next(error)
    }
  }

  notFoundCourse(req, res) {
    res.render('courses/not-found-course')
  }

  // [POST] /courses/handle-form-actions
  handleFormActions(req, res, next) {
    try {

      switch (req.body.action) {
        case 'delete':
          Course.delete({
            _id: { $in: req.body.courseIds }
          })
            .then(() => res.redirect('back'))
            .catch(next)
          break;

        default:
          res.json({ message: 'Action is invalid' })
      }
    } catch (error) {
      next(error)
    }
  }

  handleTrashFormActions(req, res, next) {
    try {

      switch (req.body.action) {
        case 'delete':
          Course.deleteMany({
            _id: { $in: req.body.courseIds }
          })
            .then(() => res.redirect('back'))
            .catch(next)
          break;
        case 'restore':
          Course.restore({
            _id: { $in: req.body.courseIds }
          })
            .then(() => res.redirect('back'))
            .catch(next)
          break;

        default:
          res.json({ message: 'Action is invalid' })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new CourseController();
