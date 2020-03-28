const express = require('express');
const expressValidator = require('express-validator');
const helmet = require('helmet');
const path = require('path');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config/config');
const interceptor = require('./common/middlewares/interceptor');

//winston logger for the application
logger = require('./common/middlewares/logger');

const routes = require('./routes/index');

const app = express();
app.set('trust proxy', true);
app.use(helmet());

// Add the interceptor middleware
app.use(interceptor);

blockHTTP = (req, res, next) => {
    if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] === 'http') {
        return res.status(403).send({
            msg: 'Cannot access via HTTP'
        });
    } else {
        next();
    }
};

if (config.blockHttp === true) {
    app.use(blockHTTP);
}
app.options('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Authorization, Accept, X-Portal");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Authorization, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.status(200).end();
});
app.use(require('morgan')('combined', {
    'stream': logger.stream
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/apidoc', express.static('apidoc'));

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.use((err, req, res, next) => {
    if (err && err.errorCode === 403)
        return res.status(400).send({
            code: 603,
            message: err.message || 'Access denied'
        });

    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;