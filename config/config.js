module.exports = {
    blockHttp: false,
    defaultLanguage: 'en-GB',
    fallBackLanguage: 'en-GB',
    allowedLanguages: ['de-DE', 'en-GB'],
    mail: {
        domain: 'mg.suprithreddy.com',
        apiKey: 'Your API Key goes here',
        from: 'Suprith Reddy  <hello@suprithreddy.com>',
        defaultPath: 'views/mailTemplates',
        companyDirectory: 'suprith-dev'
    },
    mailTemplates: {
        WELCOME: 'sr-welcome',
    }
};