const sequelize = require('../config/database');
const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

module.exports = {
  sequelize,
  User,
  Post,
  Comment
};
