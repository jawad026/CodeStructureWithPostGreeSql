const { getAllProfile, createProfile } = require("../service/profile.Service");

class ProfileController {
  async getAllProfiles(req, res) {
    try {
      const result = await getAllProfile();
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
  async createProfiles(req, res) {
    try {
      const userId = req.params.userId;
      const result = await createProfile(req.body, userId);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
  async updateProfiles(req, res) {
    try {
      const result = await updateProfile(req.body, req.params.id);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProfiles(req, res) {
    try {
      const result = await deleteProfile(req.params.id);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
  async getProfileByLimit(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1; // Get the page number from query parameters
      const perPage = parseInt(req.query.perPage) || 10; // Get the number of items per page from query parameters

      const result = await getProfileLimit(page, perPage);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ProfileController();
