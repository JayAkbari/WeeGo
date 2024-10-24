const express = require('express');
const router = express.Router();

const { authorizeRequest } = require('../../middleware/authorizeRequest');
const API_PATH = require('../../utils/apiEndPoints.js');
const validator = require('../../validator/locationValidator.js');
const locationController = require('../../controller/v1/locationController.js');
const { validateParams } = require('../../middleware/validateParams.js');

router.route(API_PATH.LOCATION.UPDATE)
    .post(
        authorizeRequest,
        validateParams(validator.update),
        locationController.update
    );

router.route(API_PATH.LOCATION.GET)
    .get(
        authorizeRequest,
        validateParams(validator.get),
        locationController.get
    );

module.exports = router;
