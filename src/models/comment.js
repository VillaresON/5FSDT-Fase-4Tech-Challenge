module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Post, {
      foreignKey: "postId",
      onDelete: "CASCADE",
    });

    Comment.belongsTo(models.Teacher, {
      foreignKey: "teacherId",
      as: "Teacher",
    });

    Comment.belongsTo(models.Student, {
      foreignKey: "studentId",
      as: "Student",
    });
  };

  return Comment;
};
