const { isEmpty } = require('lodash');

const db = require('../../database/models');
const { logger } = require('../../utils/logger.js');

exports.isExist = async (model, id) => {
    try {
        if (!model || !id) {
            return false;
        }

        const exist = await db[model].count({ where: { id } });

        return exist ? true : false;
    }
    catch (error) {
        logger.error({ message: error.message, stack: error.stack });
        return false;
    }
};

exports.getRouteById = async (id) => {
    try {
        if (!id) {
            return null;
        }

        const route = await db.Routes.findByPk(id, {
            include: [
                {
                    model: db.RouteStops,
                    as: 'stops',
                    required: false,
                }
            ],
        });

        return !isEmpty(route) ? route : null;
    }
    catch (error) {
        logger.error({ message: error.message, stack: error.stack });
        return null;
    }
};
