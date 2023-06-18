const { checkToken } = require('../helpers/jwt');
const UnauthorizedError = require('../errors/UnautorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    if (!token) {
      return next(new UnauthorizedError('Авторизуйтесь'));
    }
    payload = checkToken(token);
  } catch (err) {
    return next(new UnauthorizedError('Авторизуйтесь'));
  }
  req.user = payload;
  return next();
};
