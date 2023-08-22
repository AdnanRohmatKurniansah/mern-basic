const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const blogController = require('../controllers/blogController')

const validateBlog = [
    [body('title').isLength({min: 5}).withMessage('title tdk sesuai')], 
    [body('body').isLength({min: 5}).withMessage('body tdk sesuai')], 
]

router.get('/index', blogController.index)

router.post('/create', validateBlog, blogController.create)

router.get('/:blogId', blogController.show)

router.put('/edit/:blogId', validateBlog, blogController.update)

router.delete('/:blogId', blogController.destroy)

module.exports = router