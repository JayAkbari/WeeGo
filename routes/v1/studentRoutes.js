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

module.exports = router;
