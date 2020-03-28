const templateCreator = require('./templateCreator');

exports.generate = (templateName, data) => {
    let template = templateCreator.createHTMLTemplate(templateName, data);
    return template;
};