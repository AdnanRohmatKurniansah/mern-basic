const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const blogController = require('../controllers/blogController')

router.post('/create', 
    [body('title').isLength({min: 5}).withMessage('title tdk sesuai')], 
    [body('body').isLength({min: 5}).withMessage('body tdk sesuai')], 
    blogController.create)

module.exports = router