const express = require('express');
const router = express.Router();

const { authorizeRequest } = require('../../middleware/authorizeRequest.js');
const { validateParams } = require('../../middleware/validateParams.js');
const API_PATH = require('../../utils/apiEndPoints.js');
const validator = require('../../validator/routeValidator.js');
const routeController = require('../../controller/v1/routeController.js');

router.route(API_PATH.ROUTES.CREATE)
    .post(
        authorizeRequest,
        validateParams(validator.create),
        routeController.create
    );

router.route(API_PATH.ROUTES.GET)
    .get(
        authorizeRequest,
        validateParams(validator.get),
        routeController.get
    );

module.exports = router;
