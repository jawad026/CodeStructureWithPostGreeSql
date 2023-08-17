const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.profile = require("../model/profile.Model")(sequelize, DataTypes);
db.student = require("../model/student.Model")(sequelize, DataTypes);



db.student.hasOne(db.profile, {
  foreignKey: 'student_id',
  as: 'profile',
  onDelete: 'CASCADE',
  hook:true
})

db.profile.belongsTo(db.student, {
  foreignKey: 'student_id',
  as: 'student',
  onDelete: 'CASCADE',
  hook:true
})


db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});


module.exports = db;
