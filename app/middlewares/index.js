const { check, validationResult } = require('express-validator');

exports.runValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      status: false,
      message: errors.array()[0].msg,
    });
  }
  next();
};

exports.validationRegister = [
  check('name', 'Name cannot be empty')
    .notEmpty()
    .isLength({ min: 3, max: 50 })
    .withMessage('Must be at least 6 chars long'),
  check('email', 'Email cannot be empty')
    .notEmpty()
    .isEmail()
    .withMessage('Email must be contain @'),
  check('password', 'Password cannot be empty')
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage('Password must be 6 character '),
  check('address', 'Address cannot be empty').notEmpty(),
  check('phone_number', 'Phone number cannot be empty').notEmpty().isNumeric(),
];
