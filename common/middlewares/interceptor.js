const interceptor = require('express-interceptor');

module.exports = interceptor((req, res) => {
    return {
        isInterceptable: () => {
            if (res && (res.statusCode == 400 || res.statusCode == 500)) {
                logger.error('Request path: %s', req.originalUrl || req.url || req.baseUrl);
                logger.error('Request object: %s', JSON.stringify(req.body));
                return true;
            }
            return false;
        },
        afterSend: (oldBody, newBody) => {
            logger.error('Response object: %s', JSON.stringify(oldBody));
        }
    };
});