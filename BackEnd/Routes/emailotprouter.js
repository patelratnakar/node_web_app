// Requiring Express 
const express = require('express');
const { generateregisterotp } = require('../Controllers/emailotpcontroller');
const app = express()

// Requiring Router 
const router = express.Router()

router.post('/register/otp',generateregisterotp)

module.exports = router