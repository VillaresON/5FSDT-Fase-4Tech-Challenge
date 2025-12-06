module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    content: DataTypes.TEXT,
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Post, {
      foreignKey: "postId",
      onDelete: "CASCADE",
    });

    Comment.belongsTo(models.Teacher, {
      foreignKey: "authorId",
    });

  };


  return Comment;
};
