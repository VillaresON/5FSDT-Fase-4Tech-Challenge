module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true }
  }, {});
  return Student;
};
