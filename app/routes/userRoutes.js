const express = require('express');
const router = express.Router();
const {
  getUsers,
  registerUser,
  authUser,
  getUserProfile,
  updateUser,
  deleteUser,
} = require('../controllers/Users');
const { protect } = require('../middlewares/authMiddleware.js');
const { validationRegister, runValidation } = require('../middlewares');

router.get('/', protect, getUsers);
router.post('/register', validationRegister, runValidation, registerUser);
router.post('/login', authUser);
router.delete('/:id', protect, deleteUser);
router.put('/profile', protect, updateUser);
router.route('/profile').get(protect, getUserProfile);

module.exports = router;
