const Products = require('../models/ProductModel');

// @desc Get all products
// @route GET /api/products
// @access Public
const getProducts = async (req, res) => {
  try {
    const products = await Products.findAll();
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getProducts };
