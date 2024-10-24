const { Op } = require('sequelize');

const { getAllRecords, getPaginationParams } = require('../../helpers/response');
const db = require('../../database/models');
const common = require('./common');
const { MESSAGE } = require('../../utils/messages');
const { hashPassword } = require('../../helpers/password');
const { CONSTANTS } = require('../../utils/constants');

exports.create = async (req, res) => {
    try {
        const { name, email, mobile, address } = req.body;

        const model = 'Schools';
        const schoolExists = await common.isExistByEmail(model, email);

        if (schoolExists) {
            return res.handler.notFound(MESSAGE.SCHOOL.EXIST);
        }

        const school = await db.Schools.create({
            name,
            email,
            mobile,
            password: await hashPassword(CONSTANTS.PASSWORD.DEFAULT),
            address
        });

        if (!school) {
            return res.handler.badRequest(MESSAGE.DATA.CREATE.ERROR);
        }

        const data = await common.getById(model, school.id);
        return res.handler.created(MESSAGE.DATA.CREATE.SUCCESS, data);
    }
    catch (error) {
        return res.handler.serverError(error);
    }
};

exports.get = async (req, res) => {
    try {
        const model = 'Schools';
        const { search } = req.query;
        const pagination = await getPaginationParams(req.query);

        let whereCond = [];
        if (search) {
            const searchArr = [
                { name: { [Op.iLike]: `%${search}%` } },
                { email: { [Op.iLike]: `%${search}%` } },
            ];

            whereCond.push({ [Op.or]: searchArr });
        }

        const query = {
            limit: pagination.limit,
            offset: pagination.start,
            where: whereCond,
            order: [['createdAt', 'DESC']],
            distinct: true,
        };

        const result = await getAllRecords(req, res, model, query);
        return result;
    }
    catch (error) {
        return res.handler.serverError(error);
    }
};
