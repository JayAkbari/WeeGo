const TRY_AGAIN = 'Please try again later.';

const MESSAGE = {
    GENERAL_ERROR: `Something went wrong, ${TRY_AGAIN}`,
    DATA: {
        FOUND: {
            SUCCESS: 'Data retirved successfully.',
            EMPTY: 'Data not available.',
        },
        CREATE: {
            SUCCESS: 'Data created successfully.',
            ERROR: `Something went wrong while creating data, ${TRY_AGAIN}`,
        },
    },
    DRIVER: {
        NOT_EXIST: 'Driver not exist.',
    },
    VEHICLE: {
        NOT_EXIST: 'Vehicle not exist.',
    },
};

module.exports = { MESSAGE };
