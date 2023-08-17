const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const blogController = require('../controllers/blogController')

router.get('/index', blogController.index)

router.post('/create', 
    [body('title').isLength({min: 5}).withMessage('title tdk sesuai')], 
    [body('body').isLength({min: 5}).withMessage('body tdk sesuai')], 
    blogController.create)

router.get('/:blogId', blogController.show)

router.put('/edit/:blogId', 
    [body('title').isLength({min: 5}).withMessage('title tdk sesuai')], 
    [body('body').isLength({min: 5}).withMessage('body tdk sesuai')], 
    blogController.update)

router.delete('/:blogId', blogController.destroy)

module.exports = router