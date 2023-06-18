const express = require('express');
const { validateUserMe } = require('../validators/userValidator');

const userRouter = express.Router();
const {
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

userRouter.get('/me', getCurrentUser);

userRouter.patch('/me', validateUserMe, updateUser);

module.exports = userRouter;
