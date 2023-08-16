const Student = require("../model/student.Model");
const Profile = require("../model/profile.Model");

// Define associations here
Profile.belongsTo(Student, { as: "Student", foreignKey: "studentId" });
Student.hasOne(Profile);
