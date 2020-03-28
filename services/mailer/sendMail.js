const Promise = require('bluebird');
const config = require('../../config/config');
const Mailgun = require('mailgun-js');
const _ = require('underscore');
const mime = require('mime-types');
const {
    TemplateGeneratorService
} = require('../templator');

const mailgun = new Mailgun({
    apiKey: config.mail.apiKey,
    domain: config.mail.domain
});

exports.sendTemplateMail = (data, file) => {
    let from = config.mail.from;
    let to = data.to; // should be array
    let templateName = data.templateName;
    let attachments = [];
    if (file && file.length > 0) {
        for (let i = 0; i < file.length; i++) {
            let fileContentType = mime.lookup(file[i].originalname);
            attachments[i] = new mailgun.Attachment({
                data: file[i].buffer,
                filename: file[i].originalname,
                knownLength: file[i].size,
                contentType: fileContentType
            });
        }
    }
    // custom from option
    if (_.has(data, 'from') && data.from != '') {
        from = data.from;
    }
    // validating if text body and subject are empty
    let populatedTemplate = TemplateGeneratorService.generate(templateName, data.bodyContent);
    if (data.subject !== '') {
        let mailData = {
            from: from,
            to: to,
            subject: data.subject,
            attachment: attachments,
        };
        if (_.has(data, 'cc')) {
            let cc = data.cc;
            mailData['cc'] = cc;
        }
        if (_.has(data, 'bcc')) {
            let bcc = data.bcc;
            mailData['bcc'] = bcc;
        }
        mailData['html'] = populatedTemplate;
        return new Promise((resolve, reject) => {
            mailgun.messages().send(mailData, (err, body) => {
                if (err) {
                    console.log('got an error: ', err);
                    reject(err);
                } else {
                    resolve(body);
                }
            });
        });
    } else {
        return new Promise((resolve, reject) => {
            reject('No valid data');
        });
    }
};