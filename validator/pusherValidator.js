const joi = require('joi');

exports.auth = joi.object({
    socket_id: joi
        .string()
        .required(),
    channel: joi
        .string()
        .required(),
});
