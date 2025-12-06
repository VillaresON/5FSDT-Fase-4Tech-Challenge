module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    excerpt: DataTypes.TEXT,
  });

  Post.associate = (models) => {
    Post.belongsTo(models.Teacher, {
      foreignKey: "authorId",
    });

    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      onDelete: "CASCADE",
    });
  };

  return Post;
};
