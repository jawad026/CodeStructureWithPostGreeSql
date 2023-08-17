const db = require("../model");

const Issue = db.issue;
const Student = db.student;

class IssueService {
  async getAllIssue() {
    try {
      const issue = await Issue.findAll({
        include: { model: Student, as: "student" },
      });
      return issue;
    } catch (err) {
      console.log(err);
    }
  }
  async createIssue(req, userId) {
    try {
      const issue = await Issue.create(req);

      const student = await Student.findByPk(userId);

      if (!student) {
        return { error: "User not found" };
      }

      // Use the correct association method (setIssues) for one-to-many relationship
      await student.addIssue(issue);

      return issue;
    } catch (err) {
      console.error(err);
      throw err; // Rethrow the error to be caught by the caller
    }
  }
  async updateProfile(req, id) {
    try {
      const Issue = await Issue.update(req, { where: { id: id } });
      return Issue;
    } catch (err) {
      console.log(err);
    }
  }
  async deleteProfile(id) {
    try {
      const Issue = await Issue.destroy({ where: { id: id } });
      const result = await Issue.findAll();
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  async getProfileLimit(page, perpage) {
    try {
      const offset = (page - 1) * perpage;
      const users = await Issue.findAll({
        offset,
        limit: perpage,
      });
      return users;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching users" });
    }
    return Issue;
  }
}
module.exports = new IssueService();
