const { Op } = require('sequelize');

const { getAllRecords } = require('../../helpers/response');
const db = require('../../database/models');
const common = require('./common');
const { MESSAGE } = require('../../utils/messages');

exports.create = async (req, res) => {
    try {
        const { custom_id, name, driver_id, vehicle_id, stops } = req.body;

        const [driverExists, vehicleExists] = await Promise.all([
            common.isExist('Drivers', driver_id),
            common.isExist('Vehicles', vehicle_id)
        ]);

        if (!driverExists) {
            return res.handler.notFound(MESSAGE.DRIVER.NOT_EXIST);
        }

        if (!vehicleExists) {
            return res.handler.notFound(MESSAGE.VEHICLE.NOT_EXIST);
        }

        // check if any route exist with requested driver/vehicle or not
        const routeExist = await db.Routes.findOne({
            where: {
                [Op.or]: [
                    { driver_id },
                    { vehicle_id }
                ],
                is_active: true
            },
            raw: true
        });

        if (routeExist) {
            let message;
            if (routeExist.driver_id === driver_id) {
                message = 'This driver is already assigned to other Route. Please choose different driver.';
                return res.handler.badRequest(message);
            }
            else if (routeExist.vehicle_id === vehicle_id) {
                message = 'This vehicle is already assigned to other Route. Please choose different vehicle.';
                return res.handler.badRequest(message);
            }
        }

        const route = await db.Routes.create({
            custom_id, name, driver_id, vehicle_id
        });

        if (!route) {
            return res.handler.badRequest(MESSAGE.DATA.CREATE.ERROR);
        }

        let data = [];
        for (const stop of stops) {
            data.push({
                name: stop.name,
                coordinates: stop.coordinates,
                route_id: route.id
            });
        }

        await db.RouteStops.bulkCreate(data);

        const routeData = await common.getRouteById(route.id);
        return res.handler.created(MESSAGE.DATA.CREATE.SUCCESS, routeData);
    }
    catch (error) {
        return res.handler.serverError(error);
    }
};

exports.get = async (req, res) => {
    try {
        const model = 'Routes';
        const { search } = req.query;
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const start = page > 1 ? ((page - 1) * limit) : 0;

        let whereCond = [];
        if (search) {
            const searchArr = [
                { name: { [Op.iLike]: `%${search}%` } },
                // { '$stops.name$': { [Op.iLike]: `%${search}%` } },
            ];

            whereCond.push({ [Op.or]: searchArr });
        }

        const query = {
            limit: limit,
            offset: start,
            where: whereCond,
            order: [['id', 'DESC']],
            distinct: true,
            include: [
                {
                    model: db.RouteStops,
                    as: 'stops',
                    required: true,
                    // duplicating: false
                }
            ],
        };

        const result = await getAllRecords(req, res, model, query);
        return result;
    }
    catch (error) {
        return res.handler.serverError(error);
    }
};
