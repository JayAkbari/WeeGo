const db = require('../database/models');
const { MESSAGE } = require('../utils/messages');

exports.getPaginationParams = async (query) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const start = (page - 1) * limit;
    return { page, limit, start };
};

exports.getAllRecords = async (req, res, model, query) => {
    try {
        const pagination = await this.getPaginationParams(req.query);
        const { count: totalCount, rows: data } = await db[model].findAndCountAll(query);

        const meta = {
            total_count: totalCount,
            count_per_page: data.length,
            current_page: pagination.page,
            limit: pagination.limit,
            total_pages: Math.ceil(totalCount / pagination.limit),
        };

        const message = (!data || data.length === 0) ? MESSAGE.DATA.FOUND.EMPTY : MESSAGE.DATA.FOUND.SUCCESS;

        return res.handler.success(message, { meta, items: data });
    }
    catch (error) {
        return res.handler.serverError(error);
    }
};
