const express = require('express')
const app = express()
const mongoose = require('mongoose')
const blogRoutes = require('./src/routes/blog')
const authRoutes = require('./src/routes/auth')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

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