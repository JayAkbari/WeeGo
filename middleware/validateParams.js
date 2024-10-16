const validateParams = (schema) => async (req, res, next) => {
    try {
        schema = schema?.body || schema;
        let params;

        switch (req.method) {
            case 'GET':
                params = req.query;
                break;
            case 'POST':
                params = req.body;
                break;
        }

        const { error } = await schema.validate(params);

        if (error) {
            return res.handler.validationError(error.details[0].message);
        }

        next();
    }
    catch (error) {
        return res.handler.serverError(error);
    }
};

module.exports = {
    validateParams
};
