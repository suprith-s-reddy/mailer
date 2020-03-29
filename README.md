# Mailer api
A wrapper api for a mailing microservice using Mailgun and EJS. Completely tested in a production environment for sending bulk asynchronous emails, with custom made ejs templates. Designed to use in microservices environments. The api also includes inbuilt request logging using winston logger.



## How to use/ run the api
    # step 1 - install dependencies
    
    npm install

    # step 2 - create a logs directly in the root folder of the project
    
    mkdir logs

    # step 3 - add the following parameters in the config file /root/config/config.js. The sample domain and mail are filled in the code already, but cannot be used.
    
    domain: 'YOUR MAILGUN SUBDOMAIN GOES HERE',
    apiKey: 'YOUR MAILGUN API KEY GOES HERE',
    from: 'YOUR DEFAULT FROM EMAIL GOES HERE',

    # step 4 - run the command
    npm run dev

Your api is running in http://localhost:3000/ , check for the api readiness using the index route in the browser. You should see a welcome page.

## Documentation

The complete api documentation can be acessed using http://localhost:3000/docs. The documentation is built on swagger.

## License
Apache 2.0 license









