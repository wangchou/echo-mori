import Sequelize from 'sequelize'

export default function createUser(sequelize) {
    var User = sequelize.define('User', {
        name: Sequelize.TEXT,
        uid: {
            type: Sequelize.STRING,
            unique: true,
        },
        accessToken: Sequelize.TEXT,
        refreshToken: Sequelize.TEXT,
    })
    User.sync()
    return User
}