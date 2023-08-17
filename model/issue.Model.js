module.exports = (sequelize, DataTypes) => {
  const Issue = sequelize.define(
    "Issue",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      book: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }
  );

  return Issue;
};
