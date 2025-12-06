module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Student", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
  });
};
