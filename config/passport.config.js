const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const db = require("../model"); // Adjust the path to your Sequelize models
const bcrypt = require("bcrypt");
const User = db.user;

// Local Strategy for email/password login
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// JWT Strategy for token-based authentication
const jwtOptions = {
  secretOrKey: "12345-67890-09876-54321", // Replace with your actual secret key
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  "jwt",
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findByPk(payload.sub);

      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// Helper function to sign a JWT
function signToken(userId) {
  return jwt.sign({ sub: userId }, "12345-67890-09876-54321", {
    expiresIn: "1d",
  }); // Replace with your actual secret key
}

passport.serializeUser((user, done) => {
  done(null, parseInt(user.id));
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return done(null, false); // User not found
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});

const verifyUser = passport.authenticate("jwt", { session: false });

module.exports = {
  passport,
  signToken,
  verifyUser,
};
