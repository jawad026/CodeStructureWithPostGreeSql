const Student = require("../model/student.Model"); // Import the Student model

class StudentService {
  async getAllStudent() {
    try {
      const student = await Student.findAll();
      return student;
    } catch (err) {
      console.log(err);
    }
  }
  async createStudent(req) {
    try {
      const student = await Student.create(req);
      return student;
    } catch (err) {
      console.log(err);
    }
  }
  async updateStudent(req, id) {
    try {
      const student = await Student.update(req, { where: { id: id } });
      return student;
    } catch (err) {
      console.log(err);
    }
  }
  async deleteStudent(id) {
    try {
      const student = await Student.destroy({ where: { id: id } });
      const result = await Student.findAll();
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = new StudentService();
