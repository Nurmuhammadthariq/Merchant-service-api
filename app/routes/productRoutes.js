const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/Products');
const { protect } = require('../middlewares/authMiddleware');
const { validationProducts, runValidation } = require('../middlewares');

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
router.post('/', protect, validationProducts, runValidation, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
