module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {});
  Teacher.associate = models => {
    Teacher.hasMany(models.Post, { foreignKey: 'authorId' });
  };
  return Teacher;
};
