const User = require('../model/user.model');

exports.createUser = (data) => {
  return User.create(data);
};

exports.getUserById = (id) => {
  return User.findByPk(id);
};
