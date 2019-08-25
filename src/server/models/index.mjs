import createUser from './user.mjs'
import Sequelize from 'sequelize'
import config from '../../config/index.mjs'

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: 'localhost',
  dialect: 'mysql'
})

var models = undefined

sequelize
  .authenticate()
  .then(() => {
    models = {}
    models.User = createUser(sequelize)
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default models