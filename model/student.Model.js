const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import your Sequelize instance

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

(async () => {
    await Student.sync();
    console.log('Student model synced with the database');
  })();
  
  module.exports = Student;