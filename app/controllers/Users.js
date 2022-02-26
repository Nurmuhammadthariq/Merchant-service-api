const Users = require('../models/UserModel');
const Product = require('../models/ProductModel');
const bcrypt = require('bcrypt');
const generateToken = require('../../utils/generateToken');
const model = require('../models/index');

// @desc Auth user & get token
// @route POST /api/users/login
// @access public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findAll({ where: { email: email } });
  const matchPassword = await bcrypt.compare(password, user[0].password);
  if (user && matchPassword) {
    res.json({
      id: user[0].id,
      email: user[0].email,
      token: generateToken(user[0].id),
    });
  } else {
    res.status(401).send({ msg: 'Email or password invalid' });
    throw new Error('Email or password Invalid');
  }
};

// @desc Get all users
// @route GET /api/users
// @access Private
const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      include: [
        {
          model: Product,
          as: 'products',
        },
      ],
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
    include: [
      {
        model: Product,
        as: 'products',
        attributes: ['id', 'name'],
      },
    ],
    attributes: ['id', 'name', 'email', 'address'],
    where: { id: req.user.id },
  });

  res.json({ data: user });
};

// @desc update user
// @route PUT /api/users/profile
// @access Private
const updateUser = async (req, res) => {
  try {
    const { name, email, password, address, phone_number } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const updateUser = await Users.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        address: address,
        phone_number: phone_number,
      },
      { where: { id: req.user.id } }
    );

    if (updateUser) {
      res.status(200).json({
        status: 'success',
        message: 'data has been updated',
      });
    }
  } catch (error) {
    res.send(error);
  }
};

const deleteUser = async (req, res) => {
  const user = await Users.findOne({ where: { id: req.params.id } });
  if (user) {
    await Users.destroy({ where: { id: req.params.id } });
    res.status(200).json({
      message: 'User removed',
    });
  } else {
    res.status(400).json({
      message: 'User not found',
    });
  }
};

module.exports = {
  getUsers,
  registerUser,
  authUser,
  getUserProfile,
  updateUser,
  deleteUser,
};
