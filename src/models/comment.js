module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    author: DataTypes.STRING,
    content: DataTypes.TEXT,
    postId: DataTypes.INTEGER
  }, {});
  Comment.associate = models => {
    Comment.belongsTo(models.Post, { foreignKey: 'postId' });
  };
  return Comment;
};
