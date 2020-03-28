const express = require('express');
const router = express.Router();
const multer = require('multer');
const i18n = require('../common/i18n');
const mailController = require('../controllers/mailController');
const upload = multer();

router.post('/', upload.array('attachment'), mailController.validateRequest, i18n.parseLanguage, mailController.sendMail);

module.exports = router;