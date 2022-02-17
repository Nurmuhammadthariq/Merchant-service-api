const { Sequelize, DataTypes, DATE } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
const db = require('../../config/Database');

const Users = db.define(
  'users_merchant',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.TEXT,
    },
    join_date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Users;
