const express = require('express');
const mail = require('./mail');
const swaggerDoc = require('./swagger');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Express'
    });
});

// Swagger json for mailer documentaion.
router.use('/swagger', swaggerDoc);

router.use('/send-mail', mail);

module.exports = router;