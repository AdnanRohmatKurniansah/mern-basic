const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const blogRoutes = require('./src/routes/blog')
const authRoutes = require('./src/routes/auth')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
const cookieParser = require('cookie-parser')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(bodyParser.json())

app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).single('image'))

app.use(cookieParser())

app.use('/blog', blogRoutes)

app.use('/auth', authRoutes)

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500
    const message = error.message
    const data = error.data
    res.status(status).json({
        message: message,
        data: data
    })
})

mongoose.connect(process.env.MONGO_CONNECT)
.then(() => {
    app.listen(3000, () => {
        console.log('Server listening in port 3000, Connection success')
    })
})
.catch(err => console.log(err))