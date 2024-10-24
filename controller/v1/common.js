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

exports.isExistByEmail = async (model, email) => {
    try {
        if (!model || !email) {
            return false;
        }

        const exist = await db[model].count({ where: { email } });

        return exist ? true : false;
    }
    catch (error) {
        logger.error({ message: error.message, stack: error.stack });
        return false;
    }
};

exports.getById = async (model, id) => {
    try {
        if (!model || !id) {
            return null;
        }

        const data = await db[model].findOne({ where: { id } });

        return data;
    }
    catch (error) {
        logger.error({ message: error.message, stack: error.stack });
        return null;
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
