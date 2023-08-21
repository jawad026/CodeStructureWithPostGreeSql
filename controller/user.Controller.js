const {
  loginUser,
  logoutUser,
  registerUser,
} = require("../service/user.Service");

class userController {
  async loginUser(req, res, next) {
    loginUser(req, res, next);
  }

  async logoutUser(req, res, next) {
    try {
      // Call the logoutUser function from the AuthService
      const isLoggedOut = logoutUser(req);

      if (isLoggedOut) {
        return res.json({ message: "Logout successful" });
      } else {
        return res.status(500).json({ message: "Logout failed" });
      }
    } catch (error) {
      next(error);
    }
  }
  async signupUser(req, res, next) {
    try {
      const user = await registerUser(req);
      return res
        .status(200)
        .json({
          success: true,
          status: "Registration Successful!",
          user: user,
        });
    } catch (err) {
      console.error("Error during user registration:", err);
      next(err);
    }
  }

  // Additional authentication-related controller functions (e.g., registerUser, forgotPassword, etc.)
}

module.exports = new userController();
