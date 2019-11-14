'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    googleId: DataTypes.STRING,
    username: DataTypes.STRING,
    thumbnail: DataTypes.STRING
  }, {
      charset: 'utf8mb4',
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
