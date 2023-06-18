const router = require('express').Router();
const auth = require('../middlewares/auth');
// const { logout } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

const signin = require('./signin');
const signup = require('./signup');
const userRouter = require('./users');
const movieRouter = require('./movies');

router.use('/signup', signup);
router.use('/signin', signin);
// router.post('/signout', auth, logout);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
