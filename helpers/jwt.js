const jwt = require('jsonwebtoken');
const config = require('../config/constants');

let generateToken = (user, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    try {
      const userData = {
        _id: user._id,
        email: user.email,
        username: user.username,
      };
      const token = jwt.sign({ data: userData }, secretSignature, {
        algorithm: 'HS256',
        expiresIn: tokenLife,
      });
      return resolve(token);
    } catch (error) {
      return reject(error);
    }
  });
};

let verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    try {
      const decoded = jwt.verify(token, secretKey);
      return resolve(decoded);
    } catch (error) {
      return reject(error);
    }
  });
};

async function returnToken(user) {
  try {
    const accessToken = await generateToken(
      user,
      config.jwt.accessSecret,
      config.jwt.accessLife
    );
    const refreshToken = await generateToken(
      user,
      config.jwt.refreshSecret,
      config.jwt.refreshLife
    );
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (error) {
    return error;
  }
}
module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken,
  returnToken: returnToken,
};
