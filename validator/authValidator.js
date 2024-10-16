const joi = require('joi');

exports.signIn = joi.object({
    email: joi
        .string()
        .email()
        .required(),
    password: joi
        .string()
        .required(),
});

exports.signInParents = joi.object({
    email: joi
        .string()
        .email()
        .required(),
    password: joi
        .string()
        .required(),
});

exports.signInDriver = joi.object({
    email: joi
        .string()
        .email()
        .required(),
    password: joi
        .string()
        .required(),
});

exports.signInSchool = joi.object({
    email: joi
        .string()
        .email()
        .required(),
    password: joi
        .string()
        .required(),
});
