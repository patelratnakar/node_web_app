// Requiring Express 
const express = require('express');
const app = express()

// Requiring Router 
const router = express.Router()

const { addtocart } = require('../Controllers/cartcontroller');

router.post('/addtocart',addtocart)

// Exporting Router 
module.exports = router