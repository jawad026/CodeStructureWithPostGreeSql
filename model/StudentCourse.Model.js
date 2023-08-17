module.exports = (sequelize, DataTypes) => {
    const StudentCourse = sequelize.define('StudentCourse', {
      // No attributes needed, just the foreign keys
    });
  
    return StudentCourse;
  };
  