const { Sequelize, DataTypes, DATE } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
const Products = require('./ProductModel');
const db = require('../../config/Database');

const Users = db.define(
  'users',
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

Users.hasMany(Products, { foreignKey: 'user_id', as: 'products' });
Products.belongsTo(Users, { foreignKey: 'user_id', as: 'users' });

module.exports = Users;
