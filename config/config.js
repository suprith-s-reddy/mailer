module.exports = {
    blockHttp: false,
    defaultLanguage: 'en-GB',
    fallBackLanguage: 'en-GB',
    allowedLanguages: ['de-DE', 'en-GB'],
    mail: {
        domain: 'mg.suprithreddy.com', // YOUR MAILGUN SUBDOMAIN GOES HERE
        apiKey: '', // YOUR MAILGUN API KEY GOES HERE
        from: 'Suprith Reddy  <test@suprithreddy.com>', // YOUR DEFAULT FROM EMAIL GOES HERE
        defaultPath: 'views/mailTemplates',
        companyDirectory: 'suprith-dev'
    },
    mailTemplates: {
        WELCOME: 'sr-welcome',
    }
};