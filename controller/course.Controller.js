const { getAllCourse, createCourse } = require("../service/course.Service");

class CourseController {
  async getAllCourses(req, res) {
    try {
      const result = await getAllCourse();
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
  async createCourses(req, res) {
    try {
      const userId = req.params.userId;
      const result = await createCourse(req.body, userId);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
  async updateCourses(req, res) {
    try {
      const result = await updateCourse(req.body, req.params.id);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
  async deleteCourses(req, res) {
    try {
      const result = await deleteCourse(req.params.id);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
  async getCourseByLimit(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1; // Get the page number from query parameters
      const perPage = parseInt(req.query.perPage) || 10; // Get the number of items per page from query parameters

      const result = await getCourseLimit(page, perPage);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CourseController();
