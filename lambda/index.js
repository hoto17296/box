const assert = require('assert');
const util = require('util');
const crypto = require('crypto');
const AWS = require('aws-sdk');

const s3 = new AWS.S3();

function hash(str, algorithm='sha256', encoding='hex') {
    assert(typeof(str) === 'string');
    const hmac = crypto.createHmac(algorithm, process.env.HASH_SECRET);
    hmac.update(str);
    return hmac.digest(encoding);
}

function s3_head_object(key) {
    assert(typeof(key) === 'string');
    return util.promisify(s3.headObject).bind(s3)({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
    });
}

function s3_get_signed_url(key, expires=3600) {
    return util.promisify(s3.getSignedUrl).bind(s3)('getObject', {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
        Expires: expires,
    });
}

exports.handler = async (event) => {
    const info = await s3_head_object(event.id).catch((err) => {
        switch (err.code) {
            case 'NotFound':
                return null;

            default:
                throw err;
        }
    });
    if (!info || info.Metadata.hash !== hash(event.password)) return null;
    return {
        name: decodeURIComponent(info.Metadata.filename),
        size: info.ContentLength,
        url: await s3_get_signed_url(event.id),
    };
};
