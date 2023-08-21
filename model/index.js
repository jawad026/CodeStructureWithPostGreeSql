const { Sequelize, DataTypes } = require("sequelize");
const passportLocalSequelize = require("passport-local-sequelize");
const sequelize = require("../config/db");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../model/user.Model")(sequelize, DataTypes);
db.student = require("../model/student.Model")(sequelize, DataTypes);
db.profile = require("../model/profile.Model")(sequelize, DataTypes);
db.issue = require("../model/issue.Model")(sequelize, DataTypes);
db.course = require("../model/course.Model")(sequelize, DataTypes);
db.studentCourse = require("../model/StudentCourse.Model")(
  sequelize,
  DataTypes
);

//  One to One Relationship
db.student.hasOne(db.profile, {
  foreignKey: "student_id",
  as: "profile",
  onDelete: "CASCADE",
  hook: true,
});

db.profile.belongsTo(db.student, {
  foreignKey: "student_id",
  as: "student",
  onDelete: "CASCADE",
  hook: true,
});

// One to many relationship

db.student.hasMany(db.issue, {
  foreignKey: "student_id",
  as: "issues", // Use plural form to represent a collection of issues
  onDelete: "CASCADE", // This should be fine if your business logic requires cascading deletes
});

db.issue.belongsTo(db.student, {
  foreignKey: "student_id",
  as: "student", // Use singular form to represent a single student
  onDelete: "CASCADE", // This should be fine if your business logic requires cascading deletes
});

// Many to Many relationship

db.student.belongsToMany(db.course, { through: "StudentCourse" });
db.course.belongsToMany(db.student, { through: "StudentCourse" });

db.studentCourse.belongsTo(db.student);
db.studentCourse.belongsTo(db.course);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

module.exports = db;
