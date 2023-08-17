const db = require("../model");

const Course = db.course;
const Student = db.student;

class CourseService {
  async getAllCourse() {
    try {
      const course = await Course.findAll();
      return course;
    } catch (err) {
      console.log(err);
    }
  }
async createCourse(req, userId) {
  try {
    const course = await Course.create(req);
    return course; // Return the created course, not the Course model itself
  } catch (err) {
    console.error(err);
    throw err; // Rethrow the error to be caught by the caller
  }
}

  async updateProfile(req, id) {
    try {
      const Course = await Course.update(req, { where: { id: id } });
      return Course;
    } catch (err) {
      console.log(err);
    }
  }
  async deleteProfile(id) {
    try {
      const Course = await Course.destroy({ where: { id: id } });
      const result = await Course.findAll();
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  async getProfileLimit(page, perpage) {
    try {
      const offset = (page - 1) * perpage;
      const users = await Course.findAll({
        offset,
        limit: perpage,
      });
      return users;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching users" });
    }
    return Course;
  }
}
module.exports = new CourseService();
