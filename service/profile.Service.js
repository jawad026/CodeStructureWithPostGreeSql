const db = require("../model");

const Profile = db.profile;
const Student = db.student;

class ProfileService {
  async getAllProfile() {
    try {
      const profiles = await Profile.findAll({
        include: { model: Student, as: "student" },
      });
      return profiles;
    } catch (err) {
      console.log(err);
    }
  }
  async createProfile(req, userId) {
    try {
      const profiles = await Profile.create(req);

      const student = await Student.findByPk(userId);

      if (!student) {
        return { error: "User not found" };
      }

      await student.setProfile(profiles);
      return profiles;
    } catch (err) {
      console.log(err);
    }
  }
  async updateProfile(req, id) {
    try {
      const Profile = await Profile.update(req, { where: { id: id } });
      return Profile;
    } catch (err) {
      console.log(err);
    }
  }
  async deleteProfile(id) {
    try {
      const Profile = await Profile.destroy({ where: { id: id } });
      const result = await Profile.findAll();
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  async getProfileLimit(page, perpage) {
    try {
      const offset = (page - 1) * perpage;
      const users = await Profile.findAll({
        offset,
        limit: perpage,
      });
      return users;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching users" });
    }
    return Profile;
  }
}
module.exports = new ProfileService();
