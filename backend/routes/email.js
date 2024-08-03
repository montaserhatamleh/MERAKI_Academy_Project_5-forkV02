const express = require('express');
const emailRouter = express.Router()
const {sendEmail} = require('../controllers/email')

emailRouter.post('/send',sendEmail)





module.exports = emailRouter