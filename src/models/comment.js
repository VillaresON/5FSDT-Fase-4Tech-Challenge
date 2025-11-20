const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Post = require('./post');

const Comment = sequelize.define('Comment', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  postId: { type: DataTypes.INTEGER, allowNull: false },
  author: { type: DataTypes.STRING },
  content: { type: DataTypes.TEXT, allowNull: false }
}, {
  tableName: 'comments',
  timestamps: true
});

Comment.belongsTo(Post, { foreignKey: 'postId' });

module.exports = Comment;
