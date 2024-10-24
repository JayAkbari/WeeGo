const express = require('express');
const router = express.Router();

const { authorizeRequest } = require('../../middleware/authorizeRequest.js');
const { validateParams } = require('../../middleware/validateParams.js');
const API_PATH = require('../../utils/apiEndPoints.js');
const validator = require('../../validator/schoolValidator.js');
const schoolController = require('../../controller/v1/schoolController.js');

router.route(API_PATH.SCHOOLS.CREATE)
    .post(
        authorizeRequest,
        validateParams(validator.create),
        schoolController.create
    );

router.route(API_PATH.SCHOOLS.GET)
    .get(
        authorizeRequest,
        validateParams(validator.get),
        schoolController.get
    );

module.exports = router;
