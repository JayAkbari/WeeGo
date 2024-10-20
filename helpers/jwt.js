require('dotenv').config();

const jwt = require('jsonwebtoken');

exports.createJwtToken = async (payload) => {
    if (!payload) {
        return undefined;
    }

    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

exports.verifyJwtToken = async (token) => {
    try {
        if (!token) {
            throw new Error('Token is required');
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken;
    }
    catch (error) {
        return {
            error: {
                message: (error?.message === 'jwt expired') ? 'Session Expired.' : error?.message
            }
        };
    }
};
