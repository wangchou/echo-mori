'use strict';
module.exports = (sequelize, DataTypes) => {
    const GameRecord = sequelize.define('GameRecord', {
        googleId: DataTypes.STRING,
        setId: DataTypes.INTEGER,
        startTime: DataTypes.STRING,
        endTime: DataTypes.STRING,
        gameScore: DataTypes.FLOAT,
        starCount: DataTypes.INTEGER,
    }, {});
    return GameRecord;
};