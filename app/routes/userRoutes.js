const express = require('express');
const router = express.Router();
const {
  getUsers,
  registerUser,
  authUser,
  getUserProfile,
} = require('../controllers/Users');
const { protect } = require('../middlewares/authMiddleware.js');

router.get('/', protect, getUsers);
router.post('/register', registerUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);

module.exports = router;
