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

exports.getByDriver = joi.object({
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

exports.getByParents = joi.object({
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

exports.assignStop = joi.object({
    student_id: joi
        .string()
        .guid({ version: ['uuidv4'] })
        .required(),
    route_stop_id: joi
        .string()
        .guid({ version: ['uuidv4'] })
        .required(),
});
