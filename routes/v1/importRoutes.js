const express = require('express');
const router = express.Router();

const { uploadFile } = require('../../middleware/multer.js');
const { authorizeRequest } = require('../../middleware/authorizeRequest');
const API_PATH = require('../../utils/apiEndPoints.js');
const importController = require('../../controller/v1/importController.js');
const { access } = require('../../middleware/access.js');
const { CONSTANTS } = require('../../utils/constants.js');

router.route(API_PATH.IMPORT.DRIVERS)
    .post(
        authorizeRequest,
        access(CONSTANTS.ROLES.SCHOOL),
        uploadFile('file'),
        importController.importDrivers
    );

router.route(API_PATH.IMPORT.VEHICLES)
    .post(
        authorizeRequest,
        access(CONSTANTS.ROLES.SCHOOL),
        uploadFile('file'),
        importController.importVehicles
    );

router.route(API_PATH.IMPORT.STUDENTS)
    .post(
        authorizeRequest,
        access(CONSTANTS.ROLES.SCHOOL),
        uploadFile('file'),
        importController.importStudents
    );

module.exports = router;
