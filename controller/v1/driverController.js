const { Op } = require('sequelize');

const { getAllRecords, getPaginationParams } = require('../../helpers/response');

exports.get = async (req, res) => {
    try {
        const model = 'Drivers';
        const { search } = req.query;
        const pagination = await getPaginationParams(req.query);

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
