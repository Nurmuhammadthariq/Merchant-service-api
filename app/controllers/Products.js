const Products = require('../models/ProductModel');

// @desc Get all products
// @route GET /api/products
// @access Public
const getProducts = async (req, res) => {
  try {
    const products = await Products.findAll({
      attributes: ['id', 'name', 'description', 'quantity', 'price', 'user_id'],
    });
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

// @desc Get single product
// @route GET /api/products/:id
// @access Public
const getProductById = async (req, res) => {
  const product = await Products.findAll({
    where: { id: req.params.id },
    attributes: ['id', 'name', 'description', 'quantity', 'price', 'user_id'],
  });
  res.json(product);
};

// @desc Create a product
// @route POST /api/products/
// @access Private/user
const createProduct = async (req, res) => {
  const { name, description, quantity, price } = req.body;

  const product = await Products.create({
    name: name,
    description: description,
    quantity: quantity,
    price: price,
    user_id: req.user.id,
  });

  res.status(201).json(product);
};

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/user
const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, description, quantity, price } = req.body;

  try {
    const updateProduct = await Products.update(
      {
        name: name,
        description: description,
        quantity: quantity,
        price: price,
      },
      { where: { id: productId } }
    );

    const product = await Products.findAll({ where: { id: productId } });

    if (updateProduct) {
      res.status(200).json({
        status: 'success',
        message: 'data has been updated',
      });
    } else {
      res.status(400).json({
        status: 'error',
        message: 'error updated',
      });
    }
  } catch (error) {
    res.status(400).send({ msg: 'error updated' });
  }
};

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/user
const deleteProduct = async (req, res) => {
  const product = await Products.findOne({ where: { id: req.params.id } });
  if (product) {
    await Products.destroy({ where: { id: req.params.id } });
    res.status(200).json({
      message: 'Product removed',
    });
  } else {
    res.status(400).json({
      message: 'Product not found',
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
