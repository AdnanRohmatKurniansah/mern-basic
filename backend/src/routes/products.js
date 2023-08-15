const express = require('express')
const router = express.Router()
const productController = require('../controllers/productsController')

router.post('/product', productController.createProduct)

router.get('/products', productController.allProducts)

module.exports = router