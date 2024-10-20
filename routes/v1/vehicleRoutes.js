const express = require('express');
const router = express.Router();

const { authorizeRequest } = require('../../middleware/authorizeRequest');
const { validateParams } = require('../../middleware/validateParams.js');
const API_PATH = require('../../utils/apiEndPoints.js');
const validator = require('../../validator/driverValidator.js');
const vehicleController = require('../../controller/v1/vehicleController.js');

router.route(API_PATH.VEHICLES.GET)
    .get(
        authorizeRequest,
        validateParams(validator.get),
        vehicleController.get
    );

module.exports = router;
