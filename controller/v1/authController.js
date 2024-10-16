const db = require('../../database/models');
const { createJwtToken } = require('../../helpers/jwt');
const { comparePassword } = require('../../helpers/password');

exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        let query = {
            where: { email },
            raw: true,
        };

        const user = await db.Users.scope('withSensitiveData').findOne(query);

        if (!user) {
            return res.handler.badRequest('User not available with provided email.');
        }

        if (!user.is_active) {
            return res.handler.badRequest('User is not active.');
        }

        const isPasswordCorrect = await comparePassword(password, user.password);

        if (!isPasswordCorrect) {
            return res.handler.unauthorized('Password is incorrect.');
        }

        const payload = {
            id: user.id,
            email: user.email,
        };

        const token = await createJwtToken(payload);
        delete user.password;

        return res.handler.success(
            'Authentication successfull.',
            { ...user, token }
        );
    }
    catch (error) {
        return res.handler.serverError(error);
    }
};

exports.signInParents = async (req, res) => {
    try {
        const { email, password } = req.body;

        let query = {
            where: { email },
            raw: true
        };

        const user = await db.Parents.scope('withSensitiveData').findOne(query);

        if (!user) {
            return res.handler.badRequest('User not available with provided email.');
        }

        if (!user.is_active) {
            return res.handler.badRequest('User is not active.');
        }

        const isPasswordCorrect = await comparePassword(password, user.password);

        if (!isPasswordCorrect) {
            return res.handler.unauthorized('Password is incorrect.');
        }

        const payload = {
            id: user.id,
            email: user.email,
        };

        const token = await createJwtToken(payload);
        delete user.password;

        return res.handler.success(
            'Authentication successfull.',
            { ...user, token }
        );
    }
    catch (error) {
        return res.handler.serverError(error);
    }
};

exports.signInDriver = async (req, res) => {
    try {
        const { email, password } = req.body;

        let query = {
            where: { email },
            raw: true
        };

        const user = await db.Drivers.scope('withSensitiveData').findOne(query);

        if (!user) {
            return res.handler.badRequest('User not available with provided email.');
        }

        if (!user.is_active) {
            return res.handler.badRequest('User is not active.');
        }

        const isPasswordCorrect = await comparePassword(password, user.password);

        if (!isPasswordCorrect) {
            return res.handler.unauthorized('Password is incorrect.');
        }

        const payload = {
            id: user.id,
            email: user.email,
        };

        const token = await createJwtToken(payload);
        delete user.password;

        return res.handler.success(
            'Authentication successfull.',
            { ...user, token }
        );
    }
    catch (error) {
        return res.handler.serverError(error);
    }
};

exports.signInSchool = async (req, res) => {
    try {
        const { email, password } = req.body;

        let query = {
            where: { email },
            raw: true
        };

        const user = await db.Schools.scope('withSensitiveData').findOne(query);

        if (!user) {
            return res.handler.badRequest('User not available with provided email.');
        }

        if (!user.is_active) {
            return res.handler.badRequest('User is not active.');
        }

        const isPasswordCorrect = await comparePassword(password, user.password);

        if (!isPasswordCorrect) {
            return res.handler.unauthorized('Password is incorrect.');
        }

        const payload = {
            id: user.id,
            email: user.email,
        };

        const token = await createJwtToken(payload);
        delete user.password;

        return res.handler.success(
            'Authentication successfull.',
            { ...user, token }
        );
    }
    catch (error) {
        return res.handler.serverError(error);
    }
};
