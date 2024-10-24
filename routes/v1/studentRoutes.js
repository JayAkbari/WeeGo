const express = require('express');
const router = express.Router();

const { authorizeRequest } = require('../../middleware/authorizeRequest');
const { validateParams } = require('../../middleware/validateParams.js');
const API_PATH = require('../../utils/apiEndPoints.js');
const validator = require('../../validator/studentValidator.js');
const studentController = require('../../controller/v1/studentController.js');

router.route(API_PATH.STUDENTS.GET)
    .get(
        authorizeRequest,
        validateParams(validator.get),
        studentController.get
    );

router.route(API_PATH.STUDENTS.GET_BY_DRIVER)
    .get(
        authorizeRequest,
        validateParams(validator.getByDriver),
        studentController.getByDriver
    );

router.route(API_PATH.STUDENTS.GET_BY_PARENTS)
    .get(
        authorizeRequest,
        validateParams(validator.getByParents),
        studentController.getByParents
    );

router.route(API_PATH.STUDENTS.ASSIGN_STOP)
    .post(
        authorizeRequest,
        validateParams(validator.assignStop),
        studentController.assignStop
    );

module.exports = router;
