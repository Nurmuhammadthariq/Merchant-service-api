const { Sequelize, DataTypes, DATE } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
const db = require('../../config/Database');

const Products = db.define(
  'products',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Products;
