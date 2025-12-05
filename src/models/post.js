module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    excerpt: DataTypes.STRING,
    content: DataTypes.TEXT,
    authorId: DataTypes.INTEGER
  }, {});
  Post.associate = models => {
    Post.belongsTo(models.Teacher, { foreignKey: 'authorId' });
    Post.hasMany(models.Comment, { foreignKey: 'postId' });
  };
  return Post;
};
