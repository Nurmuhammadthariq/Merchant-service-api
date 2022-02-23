const jwt = require('jsonwebtoken');
const Users = require('../models/UserModel');

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await Users.findOne({ where: { id: decoded.id } });
      req.user = user;

      next();
    } catch (error) {
      console.log(error);
    }
  }

  if (!token) {
    res.status(401).send({ msg: 'Not Authorized, no token' });
  }
};

module.exports = { protect };
