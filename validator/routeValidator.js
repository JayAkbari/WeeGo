const joi = require('joi');

exports.create = joi.object({
    custom_id: joi
        .string()
        .required(),
    name: joi
        .string()
        .required(),
    driver_id: joi
        .string()
        .guid({ version: ['uuidv4'] })
        .required(),
    vehicle_id: joi
        .string()
        .guid({ version: ['uuidv4'] })
        .required(),
    stops: joi
        .array()
        .min(1)
        .items({
            name: joi
                .string()
                .required(),
            coordinates: joi
                .object({
                    latitude: joi
                        .number()
                        .min(-90)
                        .max(90)
                        .required(),
                    longitude: joi
                        .number()
                        .min(-180)
                        .max(180)
                        .required()
                })
                .required()
        })
        .required()
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
