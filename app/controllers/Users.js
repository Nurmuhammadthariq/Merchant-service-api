const Users = require('../models/UserModel');
const bcrypt = require('bcrypt');

// @desc Get all users
// @route GET /api/users
// @access Private
const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ['id', 'name', 'email', 'address'],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (req, res) => {
  const { name, email, password, confPassword, address, phone_number } =
    req.body;

  const userExists = await Users.findOne({ where: { email: email } });
  if (password !== confPassword)
    return res
      .status(400)
      .send({ msg: `password and confirm password doesn't mactch` });

  if (userExists) {
    return res.status(400).send({ msg: `User already exists` });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const user = await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      address: address,
      phone_number: phone_number,
    });
    res.send(user);
    res.json({ msg: 'Register Berhasil' });
  } catch (error) {}
};

module.exports = { getUsers, registerUser };
