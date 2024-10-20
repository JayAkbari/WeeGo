const { Op } = require('sequelize');

const { getAllRecords } = require('../../helpers/response');

exports.get = async (req, res) => {
    try {
        const model = 'Vehicles';
        const { search } = req.query;
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const start = page > 1 ? ((page - 1) * limit) : 0;

        let whereCond = [];
        if (search) {
            const searchArr = [
                { description: { [Op.iLike]: `%${search}%` } },
            ];

            whereCond.push({ [Op.or]: searchArr });
        }

        const query = {
            limit: limit,
            offset: start,
            where: whereCond,
            order: [['id', 'DESC']],
            distinct: true,
        };

        const result = await getAllRecords(req, res, model, query);
        return result;
    }
    catch (error) {
        return res.handler.serverError(error);
    }
};
