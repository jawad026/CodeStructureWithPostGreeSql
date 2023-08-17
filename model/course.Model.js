module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define(
      "Course",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      }
    );
  
    return Course;
  };
  