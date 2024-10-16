const express = require('express');
const router = express.Router();

const { validateParams } = require('../../middleware/validateParams.js');
const API_PATH = require('../../utils/apiEndPoints.js');
const validator = require('../../validator/authValidator.js');
const authController = require('../../controller/v1/authController.js');

router.route(API_PATH.AUTH.SIGNIN)
    .post(
        validateParams(validator.signIn),
        authController.signIn
    );

router.route(API_PATH.AUTH.SIGNIN_PARENTS)
    .post(
        validateParams(validator.signInParents),
        authController.signInParents
    );

router.route(API_PATH.AUTH.SIGNIN_DRIVER)
    .post(
        validateParams(validator.signInDriver),
        authController.signInDriver
    );

router.route(API_PATH.AUTH.SIGNIN_SCHOOL)
    .post(
        validateParams(validator.signInSchool),
        authController.signInSchool
    );

module.exports = router;
