const { getAllIssue, createIssue } = require("../service/issue.Service");

class IssueController {
  async getAllIssues(req, res) {
    try {
      const result = await getAllIssue();
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
  async createIssues(req, res) {
    try {
      const userId = req.params.userId;
      const result = await createIssue(req.body, userId);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
  async updateIssues(req, res) {
    try {
      const result = await updateIssue(req.body, req.params.id);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
  async deleteIssues(req, res) {
    try {
      const result = await deleteIssue(req.params.id);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
  async getIssueByLimit(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1; // Get the page number from query parameters
      const perPage = parseInt(req.query.perPage) || 10; // Get the number of items per page from query parameters

      const result = await getIssueLimit(page, perPage);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new IssueController();
