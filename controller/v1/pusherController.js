const { pusherAuth } = require('../../helpers/pusher');
const { MESSAGE } = require('../../utils/messages');

exports.auth = async (req, res) => {
    try {
        const { socket_id, channel } = req.body;

        const data = await pusherAuth(socket_id, channel);

        if (data) {
            return res.handler.success('Auth token generated.', data);
        }
        else {
            return res.handler.badRequest(MESSAGE.GENERAL_ERROR);
        }
    }
    catch (error) {
        return res.handler.serverError(error);
    }
};
