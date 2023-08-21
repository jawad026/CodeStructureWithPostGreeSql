const passport = require("passport");
const db = require("../model");
const User = db.user; // Adjust the path to your Sequelize User model
const authenticate = require("../config/passport.config");

class AuthService {
  async loginUser(req, res, next) {
    passport.authenticate('local',(err, user, info) => {
      console.log(user)
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({
          success: false,
          status: "Login Unsuccessful!",
          err: info,
        });
      }
      req.logIn(user, (err) => {
        if (err) {
          console.log(user)
          return res.status(401).json({
            status: "Login Unsuccessful!",
            err: err,
          });
        }

        const token = authenticate.signToken({ id: req.user.id });
        return res.status(200).json({
          success: true,
          status: "Login Successful!",
          token: token,
          user: {
            email: req.user.email,
          },
        });
      });
    })(req, res, next);
  }

  async registerUser(req, res) {
    try {
      const newUser = await User.create({
        email: req.body.email,
        password:req.body.password
      });

      req.login(newUser, (err) => {
        if (err) {
          console.error("Error during authentication:", err);
          return res.status(500).json({ err: "Authentication error" });
        }
        console.log("User authenticated successfully");
        return newUser
      });
    } catch (err) {
      console.error("Error during user registration:", err);
      return ({ err: err });
    }
  }

  async logoutUser(req) {
    try {
      req.logout(); // Use Passport.js req.logout() to log the user out and clear the session
      return true; // Indicate that logout was successful
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthService();
