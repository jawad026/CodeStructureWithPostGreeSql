const {
  getAllStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentLimit,
} = require("../service/user.Service");

class StudentController {
  async getAllStudents(req, res) {
    try {
      const result = await getAllStudent();
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
  async createStudents(req, res) {
    try {
      console.log(req.body);
      const result = await createStudent(req.body);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
  async updateStudents(req, res) {
    try {
      const result = await updateStudent(req.body, req.params.id);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
  async deleteStudents(req, res) {
    try {
      const result = await deleteStudent(req.params.id);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
  async getStudentByLimit(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1; // Get the page number from query parameters
      const perPage = parseInt(req.query.perPage) || 10; // Get the number of items per page from query parameters

      const result = await getStudentLimit(page, perPage);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new StudentController();
