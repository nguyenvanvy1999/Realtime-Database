const User = require('../models/user');

async function checkDuplicateUsernameOrEmail(req, res, next) {
  //Username
  const isUsername = await User.findOne({ username: req.body.username });
  const isEmail = await User.findOne({ email: req.body.email });
  if (isUsername) {
    return res
      .status(400)
      .send({ message: 'Failed! Username is already in use!' });
  } else {
    if (isEmail) {
      return res
        .status(400)
        .send({ message: 'Failed! Email is already in use!' });
    } else {
      next();
    }
  }
}

function checkRolesExisted(req, res, next) {}

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};
module.exports = verifySignUp;
