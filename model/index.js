const { Sequelize, DataTypes } = require("sequelize");

// Create a Sequelize instance
const sequelize = new Sequelize({
  dialect: "postgres", // Use the PostgreSQL dialect
  host: "localhost", // Change this to your database host
  username: "jawad", // Change this to your database username
  password: "12345", // Change this to your database password
  database: "jawaddb", // Change this to your database name
  logging: false, // Disable logging of SQL queries
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.profile = require("../model/profile.Model")(sequelize, DataTypes);
db.student = require("../model/student.Model")(sequelize, DataTypes);


db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});


db.student.hasOne(db.profile, {
  foreignKey: 'student_id',
  as: 'profile',
  onDelete: 'CASCADE'
})

db.profile.belongsTo(db.student, {
  foreignKey: 'student_id',
  as: 'student',
  onDelete: 'CASCADE'
})

module.exports = db;
