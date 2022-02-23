const Users = require('../models/UserModel');
const bcrypt = require('bcrypt');
const generateToken = require('../../utils/generateToken');

// @desc Auth user & get token
// @route POST /api/users/login
// @access public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email: email } });
  const matchPassword = await bcrypt.compare(password, user.password);
  if (user && matchPassword) {
    res.json({
      id: user.id,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error('Email or password Invalid');
  }
};

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

// @desc Registration new user
// @route Post /api/users/register
// @access Private
const registerUser = async (req, res) => {
  const { name, email, password, confPassword, address, phone_number } =
    req.body;

  const userExists = await Users.findOne({ where: { email: email } });
  if (password !== confPassword)
    return res
      .status(400)
      .send({ msg: `password and confirm password doesn't match` });

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

    if (user) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        password: user.password,
        token: generateToken(user.id),
      });
    }
  } catch (error) {
    res.send(error);
  }
};

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = async (req, res) => {
  const user = await Users.findAll({
    where: { id: req.user.id },
    attributes: ['name', 'email', 'address', 'phone_number'],
  });

  res.json({ data: user });
};

module.exports = { getUsers, registerUser, authUser, getUserProfile };
