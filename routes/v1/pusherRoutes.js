const express = require('express');
const router = express.Router();

const { authorizeRequest } = require('../../middleware/authorizeRequest');
const API_PATH = require('../../utils/apiEndPoints.js');
const validator = require('../../validator/pusherValidator.js');
const pusherController = require('../../controller/v1/pusherController.js');
const { validateParams } = require('../../middleware/validateParams.js');

router.route(API_PATH.PUSHER.AUTH)
    .post(
        authorizeRequest,
        validateParams(validator.auth),
        pusherController.auth
    );

module.exports = router;
