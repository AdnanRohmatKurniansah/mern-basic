const {validationResult} = require('express-validator')
const Blog = require('../models/blog')
const path = require('path')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.index = async (req, res, next) => {
    try {
        const currentPage = req.query.page || 1;
        const perPage = req.query.perPage || 4;
        let totalItems;

        const count = await Blog.countDocuments();
        totalItems = count;

        const result = await Blog.find()
            .skip((parseInt(currentPage) - 1) * perPage)
            .limit(perPage);

        res.status(200).json({
            message: 'Berhasil memanggil data',
            data: result,
            total_data: totalItems,
            per_page: perPage,
            current_page: currentPage
        });
    } catch (error) {
        res.status(500).json({
            message: 'Gagal memanggil data',
        });
    }
};

exports.create = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Invalid value',
                errors: errors.array()
            });
        }

        if (!req.file) {
            return res.status(422).json({
                message: 'Image harus diupload',
            });
        }

        const title = req.body.title;
        const body = req.body.body;
        const image = req.file.path;

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const authorId = decodedToken.id;

        const user = await User.findById(authorId);

        const posting = new Blog({
            title: title,
            body: body,
            image: image,
            author: {
                id: user._id,
                nama: user.name
            }
        });

        const result = await posting.save();

        res.status(201).json({
            message: 'Berhasil menambahkan blog post baru',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan saat membuat blog post',
        });
    }
};

exports.show = async (req, res, next) => {
    try {
        const result = await Blog.findById(req.params.blogId);

        if (!result) {
            const error = new Error('Blog tidak ditemukan');
            error.errorStatus = 404;
            throw error;
        }

        res.status(200).json({
            message: 'Berhasil memanggil data',
            data: result
        });
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const errors = validationResult(req)
    
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Invalid value',
                errors: errors.array()
            });
        }

        const title = req.body.title
        const body = req.body.body
        let image = null; 

        if (req.file) {
            image = req.file.path; 
        }

        const blog = await Blog.findById(req.params.blogId)
        
        if (!blog) {
            return res.status(404).json({
                message: 'Blog tdk ditemukan',
            })
        }

        blog.title = title
        blog.body = body
        if (image) {
            if (blog.image) {
                removeImage(blog.image);
            }
            blog.image = image; 
        }

        const result = await blog.save();
        
        res.status(200).json({
            message: 'Berhasil mengupdate blog',
            data: result    
        })
    } catch (err) {
        next(err)
    }
}

exports.destroy = (req, res, next) => {
    Blog.findById(req.params.blogId)
    .then(blog => {
        if (!blog) {
            return res.status(404).json({
                message: 'Blog tdk ditemukan',
            })
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