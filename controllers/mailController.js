const _ = require('underscore');
const enums = require('../common/constants/enums');
const statusCodes = require('../common/constants/statusCodes');
const statusMessages = require('../common/constants/statusMessages');
const {
    SendEmailService
} = require('../services/mailer');

exports.validateRequest = async (req, res, next) => {
    try {
        let data = req.body;
        let templateArray = enums.templateNames;
        if (_.has(data, 'to') && _.has(data, 'bodyContent') && _.has(data, 'templateName')) {
            if (templateArray.includes(data.templateName)) {
                next();
            } else {
                return res.status(statusCodes.BAD_REQUEST).send({
                    code: statusCodes.errorCodes.INVALID_TEMPLATE_NAME,
                    msg: statusMessages.errorMessages.INVALID_TEMPLATE_NAME
                });
            }
        } else {
            return res.status(statusCodes.BAD_REQUEST).send({
                code: statusCodes.errorCodes.PARAMETER_MISSING,
                msg: statusMessages.errorMessages.PARAMETER_MISSING
            });
        }
    } catch (err) {
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).send({
            code: statusCodes.NO_RECORDS,
            msg: err || err.message || statusMessages.INTERNAL_SERVER_ERROR
        });
    }
};

exports.sendMail = async (req, res, next) => {
    try {
        let response = await SendEmailService.sendTemplateMail(req.body, req.files);
        if (response) {
            return res.status(statusCodes.OK).send({
                code: statusCodes.RECORDS_FOUND,
                msg: statusMessages.successMessages.MAIL_QUEUED_SUCCESSFULLY
            });
        } else {
            return res.status(statusCodes.BAD_REQUEST).send({
                code: statusCodes.NO_RECORDS,
                msg: statusMessages.errorMessages.MAIL_SENDING_FAILED
            });
        }
    } catch (err) {
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).send({
            code: statusCodes.NO_RECORDS,
            msg: err || err.message || statusMessages.INTERNAL_SERVER_ERROR
        });
    }
};