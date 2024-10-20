exports.access = (role) => async (req, res, next) => {
    try {
        if (req.user.role !== role) {
            return res.handler.unauthorized('Invalid Access.');
        }

        next();
    }
    catch (error) {
        return res.handler.serverError(error);
    }
};
