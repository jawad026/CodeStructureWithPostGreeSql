const db = require("../model");

const Student = db.student;

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
      const student = await Student.destroy({
        where: { id: id },
        include: [
          {
            model: db.profile,
            as: "profile", // Include the associated profiles for cascading delete
          },
        ],
      });
  
      return student;
    } catch (err) {
      console.error(err);
      throw err; // Rethrow the error to be caught by the caller
    }
  }
  
  async getStudentLimit(page, perpage) {
    try {
      const offset = (page - 1) * perpage;
      const users = await Student.findAll({
        offset,
        limit: perpage,
      });
      return users;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching users" });
    }
    return student;
  }
}
module.exports = new StudentService();
