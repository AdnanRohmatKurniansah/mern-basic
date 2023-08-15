const express = require('express')
const app = express()
const productRoutes = require('./src/routes/products')

app.use((req, res, next) => {
    req.setHeader('Access-Control-Allow-Origin', '*')
    req.setHeader('Access-Control-Allow-Method', 'GET, POST, PATCH, DELETE, OPTIONS')
    req.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/', productRoutes)

app.listen(3000, () => {
    console.log('Server listening in port 3000')
})