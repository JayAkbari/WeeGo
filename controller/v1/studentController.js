const { Op } = require('sequelize');

const { getAllRecords } = require('../../helpers/response');
const db = require('../../database/models');
const common = require('./common');
const { MESSAGE } = require('../../utils/messages');

exports.get = async (req, res) => {
    try {
        const model = 'Students';
        const { search } = req.query;
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const start = page > 1 ? ((page - 1) * limit) : 0;

        let whereCond = [];
        if (search) {
            const searchArr = [
                { name: { [Op.iLike]: `%${search}%` } },
                { email: { [Op.iLike]: `%${search}%` } },
                { mobile: { [Op.iLike]: `%${search}%` } },
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
                    model: db.Schools,
                    as: 'school_data',
                    required: false,
                },
                {
                    model: db.StudentParents,
                    as: 'parents',
                    required: true,
                    include: [
                        {
                            model: db.Parents,
                            as: 'parents_data',
                            required: false,
                        }
                    ]
                },
                {
                    model: db.Routes,
                    as: 'route_data',
                    required: false,
                    include: [
                        {
                            model: db.Drivers,
                            as: 'driver_data',
                            required: false,
                        },
                        {
                            model: db.Vehicles,
                            as: 'vehicle_data',
                            required: false,
                        },
                    ]
                },
                {
                    model: db.RouteStops,
                    as: 'route_stop_data',
                    required: false,
                }
            ]
        };

        const result = await getAllRecords(req, res, model, query);
        return result;
    }
    catch (error) {
        return res.handler.serverError(error);
    }
};

exports.getByDriver = async (req, res) => {
    try {
        const { search } = req.query;
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const start = page > 1 ? ((page - 1) * limit) : 0;

        const { driver_id } = req.params;
        const driverExists = await common.isExist('Drivers', driver_id);

        if (!driverExists) {
            return res.handler.notFound(MESSAGE.DRIVER.NOT_EXIST);
        }

        // get route data by driver
        const route = await db.Routes.findOne({
            where: { driver_id }
        });

        if (!route) {
            const message = 'Driver does not have any assigned route.';
            return res.handler.badRequest(message);
        }

        const model = 'Students';
        let whereCond = [
            { assigned_route_id: route.id }
        ];

        if (search) {
            const searchArr = [
                { name: { [Op.iLike]: `%${search}%` } },
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
                    model: db.Schools,
                    as: 'school_data',
                    required: false,
                },
                {
                    model: db.StudentParents,
                    as: 'parents',
                    required: true,
                    include: [
                        {
                            model: db.Parents,
                            as: 'parents_data',
                            required: false,
                        }
                    ]
                },
                {
                    model: db.Routes,
                    as: 'route_data',
                    required: false,
                    include: [
                        {
                            model: db.Drivers,
                            as: 'driver_data',
                            required: false,
                        },
                        {
                            model: db.Vehicles,
                            as: 'vehicle_data',
                            required: false,
                        },
                    ]
                },
                {
                    model: db.RouteStops,
                    as: 'route_stop_data',
                    required: false,
                }
            ]
        };

        const result = await getAllRecords(req, res, model, query);
        return result;
    }
    catch (error) {
        return res.handler.serverError(error);
    }
};

exports.getByParents = async (req, res) => {
    try {
        const { search } = req.query;
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const start = page > 1 ? ((page - 1) * limit) : 0;

        const { parent_id } = req.params;
        const parentExists = await common.isExist('Parents', parent_id);

        if (!parentExists) {
            return res.handler.notFound(MESSAGE.PARENT.NOT_EXIST);
        }

        // get student-parents data
        const student_parents = await db.StudentParents.findAll({
            where: { parent_id },
            raw: true,
        });

        if (!student_parents?.length) {
            const message = 'Parent does not have child.';
            return res.handler.badRequest(message);
        }

        const student_ids = student_parents.map((data) => data.student_id);

        const model = 'Students';
        let whereCond = [
            { id: { [Op.in]: student_ids } }
        ];

        if (search) {
            const searchArr = [
                { name: { [Op.iLike]: `%${search}%` } },
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
                    model: db.Schools,
                    as: 'school_data',
                    required: false,
                },
                {
                    model: db.StudentParents,
                    as: 'parents',
                    required: true,
                    include: [
                        {
                            model: db.Parents,
                            as: 'parents_data',
                            required: false,
                        }
                    ]
                },
                {
                    model: db.Routes,
                    as: 'route_data',
                    required: false,
                    include: [
                        {
                            model: db.Drivers,
                            as: 'driver_data',
                            required: false,
                        },
                        {
                            model: db.Vehicles,
                            as: 'vehicle_data',
                            required: false,
                        },
                    ]
                },
                {
                    model: db.RouteStops,
                    as: 'route_stop_data',
                    required: false,
                }
            ]
        };

        const result = await getAllRecords(req, res, model, query);
        return result;
    }
    catch (error) {
        return res.handler.serverError(error);
    }
};

exports.assignStop = async (req, res) => {
    try {
        const { student_id, route_stop_id } = req.body;
        const [studentExists, routeStopExists] = await Promise.all([
            common.isExist('Students', student_id),
            common.isExist('RouteStops', route_stop_id)
        ]);

        if (!studentExists) {
            return res.handler.notFound(MESSAGE.STUDENT.NOT_EXIST);
        }

        if (!routeStopExists) {
            return res.handler.notFound(MESSAGE.ROUTE_STOP.NOT_EXIST);
        }

        const stop_data = await db.RouteStops.findOne({ where: { id: route_stop_id } });
        await db.Students.update(
            { assigned_route_id: stop_data.route_id, assigned_route_stop_id: route_stop_id },
            { where: { id: student_id } }
        );

        return res.handler.success(MESSAGE.STUDENT.ROUTE_ASSIGNED);
    }
    catch (error) {
        return res.handler.serverError(error);
    }
};
