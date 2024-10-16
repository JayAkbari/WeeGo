const joi = require('joi');

exports.get = joi.object({
    page: joi
        .number()
        .required(),
    limit: joi
        .number()
        .required(),
    search: joi
        .string()
        .optional()
});
