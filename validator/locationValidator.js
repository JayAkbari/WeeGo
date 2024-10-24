const joi = require('joi');

exports.get = joi.object({
    driver_id: joi
        .string()
        .guid({ version: ['uuidv4'] })
        .required(),
});

exports.update = joi.object({
    driver_id: joi
        .string()
        .guid({ version: ['uuidv4'] })
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
});
