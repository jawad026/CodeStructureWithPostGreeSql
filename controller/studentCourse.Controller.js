const {
  getAllStudentByCourse,
  createStudentCourse,
} = require("../service/studentCourse.Service");

class StudentCourseService {
  async getAllStudentCourse(req, res) {
    try {
      const result = await getAllStudentByCourse();
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
  async createStudentCourses(req, res) {
    try {
      const userId = req.query.userId;
      const courseId = req.query.courseId;
      const result = await createStudentCourse(courseId, userId);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new StudentCourseService();
