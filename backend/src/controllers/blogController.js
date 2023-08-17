const {validationResult} = require('express-validator')
const Blog = require('../models/blog')

exports.create = (req, res, next) => {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        const err = new Error('Invalid value')
        err.errorStatus = 400
        err.data = errors.array()
        throw err
    }

    if (!req.file) {
        const err = new Error('Image harus diupload')
        err.errorStatus = 422
        throw err
    }

    const title = req.body.title
    const body = req.body.body
    const image = req.file.path

    const posting = new Blog({
        title: title,
        body: body,
        image: image,
        author: {
            id: 1,
            nama: 'Adnan'
        }
    })

    posting.save()
    
    .then(result => {
        res.status(201).json({
            message: 'Berhasil menambahkan blog post baru',
            data: result
        })
    })
    .catch(err => {
        console.log('err :', err)
    })
}