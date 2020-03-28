const config = require('../config/config');

// mandatory language middleware for default template content population
exports.parseLanguage = (req, res, next) => {
    let locale = config.defaultLanguage;
    let languageArray = config.allowedLanguages;
    if (req.headers['accept-language'] && languageArray.includes(req.headers['accept-language'])) {
        locale = req.headers['accept-language'];
    } else if (req.params.lang && languageArray.includes(req.params.lang)) {
        locale = req.params.lang;
    } else {
        locale = config.fallBackLanguage;
    }
    let languageFile = require('../locales/' + locale + '.json');
    let generalContent = languageFile['general'];
    let mailSubject = languageFile[req.body.templateName].subject;
    let templateContent = languageFile[req.body.templateName];
    if (mailSubject === null || mailSubject === undefined) {
        req.body['subject'] = 'SR Mailer';
    } else {
        req.body['subject'] = mailSubject;
    }
    req.body['bodyContent'] = Object.assign(templateContent, generalContent, req.body['bodyContent']);
    next();
};