const db = require('../../database/models');
const { triggerEvent } = require('../../helpers/pusher');
const { MESSAGE } = require('../../utils/messages');
const common = require('./common');

exports.update = async (req, res) => {
    try {
        const { driver_id, coordinates } = req.body;

        const driverExists = await common.isExist('Drivers', driver_id);
        if (!driverExists) {
            return res.handler.notFound(MESSAGE.DRIVER.NOT_EXIST);
        }

        const channel = `driver-${driver_id}`;
        const event = 'driver-locations';
        const trigger_event = await triggerEvent(channel, event, coordinates);

        if (trigger_event) {
            await db.DriverLocations.upsert(
                { driver_id, coordinates }
            );

            return res.handler.success('location updated.');
        }
        else {
            return res.handler.badRequest(MESSAGE.GENERAL_ERROR);
        }
    }
    catch (error) {
        return res.handler.serverError(error);
    }
};

exports.get = async (req, res) => {
    try {
        const { driver_id } = req.query;

        const driverExists = await common.isExist('Drivers', driver_id);
        if (!driverExists) {
            return res.handler.notFound(MESSAGE.DRIVER.NOT_EXIST);
        }

        const driver_location = await db.DriverLocations.findOne({
            where: { driver_id }
        });

        if (driver_location) {
            return res.handler.success(MESSAGE.DATA.FOUND.SUCCESS, driver_location);
        }
        else {
            return res.handler.success(MESSAGE.DATA.FOUND.EMPTY);
        }
    }
    catch (error) {
        return res.handler.serverError(error);
    }
};
