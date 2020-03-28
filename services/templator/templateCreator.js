const Path = require('path');
const config = require('../../config/config');
const fse = require('fs-extra');
const ejs = require('ejs');

exports.createHTMLTemplate = (templateName, data) => {
    let name = templateName + '.ejs';
    let path = Path.join(__dirname, '../../', config.mail.defaultPath, config.mail.companyDirectory, name);
    let html = fse.readFileSync(path, {
        encoding: 'utf-8'
    });
    let template = ejs.compile(html, {
        filename: path
    });
    let dynamicData = {
        'content': data
    };
    template = template(dynamicData);
    return template;
};