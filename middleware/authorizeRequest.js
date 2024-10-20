const { verifyJwtToken } = require('../helpers/jwt');

exports.authorizeRequest = async (req, res, next) => {
    console.log('req--- ', req.originalUrl);
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.handler.unauthorized('Authorization token not found.');
        }

        // Extract token by removing 'Bearer ' prefix if it exists
        const token = authorizationHeader.replace(/^Bearer\s+/i, '');

        const decodedToken = await verifyJwtToken(token);

        if (decodedToken?.error) {
            const errorMessage = decodedToken?.error?.message || 'Authorization failed.';
            return res.handler.unauthorized(errorMessage);
        }

        req.user = { id: decodedToken.id, email: decodedToken.email, role: decodedToken.role };
        next();
    }
    catch (error) {
        return res.handler.serverError(error);
    }
};
