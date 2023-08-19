const {validationResult} = require('express-validator')
const Blog = require('../models/blog')
const path = require('path')
const fs = require('fs')

exports.index = (req, res, next) => {
    const currentPage = req.query.page || 1
    const perPage = req.query.perPage || 5
    let totalItems;

    Blog.find()
    .countDocuments()
    .then(count => {
        totalItems = count
        return Blog.find()
        .skip((parseInt(currentPage) - 1) * perPage)
        .limit(perPage)
    })
    .then(result => {
        res.status(200).json({
            message: 'Berhasil memanggil data',
            data: result,
            total_data: totalItems,
            per_page: perPage,
            current_page: currentPage
        })
    })
    .catch(err => {
        next(err)
    })
}

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

exports.show = (req, res, next) => {
    Blog.findById(req.params.blogId)
    .then(result => {
        if (!result) {
            const error = new Error('Blog tdk ditemukan')
            error.errorStatus = 404
            throw error
        }
        res.status(200).json({
            message: 'Berhasil memanggil data',
            data: result    
        })
    })
    .catch(err => {
        next(err)
    })
}

exports.update = (req, res, next) => {
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

    Blog.findById(req.params.blogId)
    .then(blog => {
        if (!blog) {
            const err = new Error('Blog tdk ditemukan')
            err.errorStatus = 404
            throw error
        }

        blog.title = title
        blog.body = body
        blog.image = image

        return blog.save()
    })
    .then(result => {
        res.status(200).json({
            message: 'Berhasil mengupdate blog',
            data: result    
        })
    })
    .catch(err => {
        next(err)
    })

}

exports.destroy = (req, res, next) => {
    Blog.findById(req.params.blogId)
    .then(blog => {
        if (!blog) {
            const error = new Error('Blog tdk ditemukan')
            error.errorStatus = 404
            throw error
        }
        
        removeImage(blog.image)
        return Blog.findByIdAndRemove(req.params.blogId)
    })
    .then(result => {
        res.status(200).json({
            message: 'Berhasil menghapus blog',
            data: result   
        })
    })
    .catch(err => {
        next(err)
    })
}

const removeImage = (filePath) => {
    filePath = path.join(__dirname, '../..', filePath)
    fs.unlink(filePath, err => console.log(err))
}