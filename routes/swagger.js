const express = require('express');
const router = express.Router();
const swagger = require('../docs/swagger.json');

router.get('/', (req, res, next) => {
    res.jsonp(swagger);
});

module.exports = router;