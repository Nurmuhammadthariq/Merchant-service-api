const { Sequelize } = require('sequelize');

const db = new Sequelize('mini_project', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3308,
});

module.exports = db;
