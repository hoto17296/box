const crypto = require('crypto');

function hash(str, encoding='hex') {
    const hmac = crypto.createHmac('sha256', 'deadbeef');
    hmac.update(str);
    return hmac.digest(encoding);
}

exports.handler = async (event) => {
    event.hash = hash(event.password);
    return event;
};
