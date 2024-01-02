//Import Dependencies
const express = require('express')
const axios = require('axios')
const allPlacesUrl = process.env.COUNTRY_API_URL
const nameSearchBaseUrl = process.env.C_BY_NAME_BASE_URL
const Recipe = require('../models/recipe')

//Create Router
const router = express.Router()

//Routes + Controllers

//Export Router
module.exports = router