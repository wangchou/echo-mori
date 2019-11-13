'use strict';
module.exports = (sequelize, DataTypes) => {
    const Score = sequelize.define(
        'Score',
        {
            googleId: DataTypes.STRING,
            sentenceId: DataTypes.INTEGER,
            score: DataTypes.INTEGER,
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['googleId', 'sentenceId']
                }
            ]
        }
    );
    return Score;
};