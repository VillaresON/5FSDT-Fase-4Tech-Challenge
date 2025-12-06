module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define("Teacher", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  });

  Teacher.associate = (models) => {
    Teacher.hasMany(models.Post, {
      foreignKey: "authorId",
      onDelete: "CASCADE",
    });

    Teacher.hasMany(models.Comment, {
      foreignKey: "teacherId",
      as: "Comments",
      onDelete: "CASCADE",
    });
  };

  return Teacher;
};
