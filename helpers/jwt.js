const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/constant/jwt');
const { APIError } = require('./error');

async function generateToken(user, secretSignature, tokenLife) {
    try {
        const userData = {
            _id: user._id,
            email: user.email,
            username: user.username,
            roles: user.roles,
        };
        return await jwt.sign({ data: userData }, secretSignature, {
            algorithm: 'HS256',
            expiresIn: tokenLife,
        });
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

async function verifyToken(token, secretKey) {
    try {
        return await jwt.verify(token, secretKey);
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

async function returnToken(user) {
    try {
        const accessToken = await generateToken(
            user,
            jwtConfig.ACCESS.SECRET,
            jwtConfig.ACCESS.LIFE
        );
        const refreshToken = await generateToken(
            user,
            jwtConfig.REFRESH.SECRET,
            jwtConfig.REFRESH.LIFE
        );
        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}
module.exports = { generateToken, verifyToken, returnToken };