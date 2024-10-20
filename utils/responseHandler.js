const { CONSTANTS } = require('./constants.js');
const { HTTP_CODES } = require('./httpCodes');
const { logger } = require('./logger.js');

class ResponseHandler {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    sender(isSuccess, httpCode, message, data = {}, error) {
        if (error) {
            logger.error({
                message: error.message || error || 'An error occurred',
                stack: error.stack || 'No stack trace available',
                meta: {
                    url: this.req.originalUrl,
                    method: this.req.method
                }
            });
        }

        this.res.status(httpCode).json({
            success: isSuccess,
            message: error ? (error?.message || error) : message,
            data: data,
        });
    }

    custom(...args) { this.sender(...args); }

    // 2XX SUCCESS
    success(message = 'SUCCESS', data = {}) {
        this.sender(
            CONSTANTS.RESPONSE_STATUS.TRUE,
            HTTP_CODES.SUCCESS,
            message,
            data
        );
    }

    created(message = 'CREATED', data = {}) {
        this.sender(
            CONSTANTS.RESPONSE_STATUS.TRUE,
            HTTP_CODES.CREATED,
            message,
            data
        );
    }

    // 4XX CLIENT ERROR
    badRequest(message = 'BAD_REQUEST') {
        this.sender(
            CONSTANTS.RESPONSE_STATUS.FALSE,
            HTTP_CODES.BAD_REQUEST,
            message
        );
    }

    unauthorized(message = 'UNAUTHORIZED') {
        this.sender(
            CONSTANTS.RESPONSE_STATUS.FALSE,
            HTTP_CODES.UNAUTHORIZED,
            message,
            {}
        );
    }

    notFound(message = 'NOT_FOUND') {
        this.sender(
            CONSTANTS.RESPONSE_STATUS.FALSE,
            HTTP_CODES.NOT_FOUND,
            message,
            {}
        );
    }

    conflict(message = 'CONFLICT') {
        this.sender(
            CONSTANTS.RESPONSE_STATUS.FALSE,
            HTTP_CODES.CONFLICT,
            message,
            {}
        );
    }

    validationError(message = 'VALIDATION_ERROR') {
        this.sender(
            CONSTANTS.RESPONSE_STATUS.FALSE,
            HTTP_CODES.VALIDATION_ERROR,
            message,
            {}
        );
    }

    // 5XX SERVER ERROR
    serverError(error) {
        this.sender(
            CONSTANTS.RESPONSE_STATUS.FALSE,
            HTTP_CODES.SERVER_ERROR,
            'SERVER_ERROR',
            {},
            error
        );
    }
}

module.exports = ResponseHandler;
