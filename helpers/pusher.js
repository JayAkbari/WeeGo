const Pusher = require('pusher');

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
});

exports.triggerEvent = async (channel, event, data) => {
    try {
        await pusher.trigger(channel, event, data);
        return true;
    }
    catch (error) {
        console.log('error: ', error);
        return false;
    }
};

exports.pusherAuth = async (socket_id, channel) => {
    try {
        const auth = pusher.authorizeChannel(socket_id, channel);
        return auth;
    }
    catch (error) {
        console.log('error: ', error);
        return false;
    }
};
