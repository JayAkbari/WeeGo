const joi = require('joi');

exports.create = joi.object({
    name: joi
        .string()
        .required(),
    email: joi
        .string()
        .email()
        .required(),
    mobile: joi
        .string()
        .required(),
    address: joi
        .string()
        .required(),
});

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
