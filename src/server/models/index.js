'use strict';
import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import config from '../config/config.js'
import { fileURLToPath } from 'url';

const __filename = import.meta.url.replace(/^file:\/\//, '');
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const basename = path.basename(__filename);
const db = {};

let sequelize = new Sequelize(config.db.database,
                              config.db.username,
                              config.db.password,
                              config.db);
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

sequelize.sync()
//sequelize.sync({force: true})


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
