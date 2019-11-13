'use strict';
module.exports = (sequelize, DataTypes) => {
    const UserSaid = sequelize.define(
        'UserSaid',
        {
            googleId: DataTypes.STRING,
            sentenceId: DataTypes.INTEGER,
            said: DataTypes.STRING,
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['googleId', 'sentenceId']
                }
            ]
        }
    )
    return UserSaid;
};