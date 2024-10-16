const express = require('express');
const router = express.Router();

const { authorizeRequest } = require('../../middleware/authorizeRequest');
const { validateParams } = require('../../middleware/validateParams.js');
const API_PATH = require('../../utils/apiEndPoints.js');
const validator = require('../../validator/driverValidator.js');
const driverController = require('../../controller/v1/driverController.js');

router.route(API_PATH.DRIVERS.GET)
    .get(
        authorizeRequest,
        validateParams(validator.get),
        driverController.get
    );

module.exports = router;
