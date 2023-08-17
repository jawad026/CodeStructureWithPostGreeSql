const db = require("../model");

const Course = db.course;
const Student = db.student;
const studentCourse = db.studentCourse;
class CourseService {
  async getAllStudentByCourse() {
    try {
      const allStudentsWithCourses = await Student.findAll({
        include: { model: Course, as: "Courses" },
         // Include associated courses
      });
      const studentsWithCourses = allStudentsWithCourses.filter(student => student.Courses.length > 0);

      return studentsWithCourses;
    } catch (err) {
      console.log(err);
    }
  }
  async createStudentCourse(courseId, userId) {
    try {
      const student = await Student.findByPk(userId);
      const course = await Course.findByPk(courseId);

      if (!student) {
        return { error: "Student not found" };
      }

      if (!course) {
        return { error: "Course not found" };
      }

      // Associate student with course
      await student.addCourse(course);

      return { message: "Student and Course added successfully" };
    } catch (err) {
      console.error(err);
      throw err; // Rethrow the error to be caught by the caller
    }
  }
}
module.exports = new CourseService();
