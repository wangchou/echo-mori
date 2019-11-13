'use strict';
module.exports = (sequelize, DataTypes) => {
    const UserSaid = sequelize.define('UserSaid', {
        googleId: DataTypes.STRING,
        sentenceId: DataTypes.INTEGER,
        said: DataTypes.STRING,
    }, {});
    return UserSaid;
};