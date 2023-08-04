const http2 = require('http2');
const bcrypt = require('bcryptjs');
const { NotFoundError } = require('../errors/NotFoundError');
const User = require('../models/users');
const { generateToken } = require('../helpers/jwt');

const {
  HTTP_STATUS_OK, // 200
  HTTP_STATUS_CREATED, // 201
} = http2.constants;

const getCurrentUser = (req, res, next) => {
  const _id = req.user._id;
  User.findById(({ _id }))
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ message: 'Пользователь не найден' });
      }
      res.status(HTTP_STATUS_OK).send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.status(HTTP_STATUS_CREATED).send({
        name: user.name,
        email: user.email,
        _id: user.id,
      });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const data = req.body;
  User.findByIdAndUpdate(req.user._id, data, { new: true, runValidators: true })
    .then((user) => {
      res.status(HTTP_STATUS_OK).send({
        _id: user._id,
        email: user.email,
        name: user.name,

      });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken({ _id: user._id });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ token });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Вы вышли из профиля' });
};

module.exports = {
  getCurrentUser,
  createUser,
  updateUser,
  login,
  logout,
};
