const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const authController = require('../controllers/authController')

const validateRegister = [
    body('name').notEmpty().withMessage('Nama tdk boleh kosong').isLength({min: 5}).withMessage('Nama minimal 5 karakter'),
    body('email').notEmpty().withMessage('Email tdk boleh kosong').isEmail().withMessage('Email harus valid'),
    body('password').notEmpty().withMessage('Password tdk boleh kosong').isLength({min: 5}).withMessage('Password minimal 5 karakter')
]

const validateLogin = [
    body('email').notEmpty().withMessage('Email tdk boleh kosong').isEmail().withMessage('Email harus valid'),
    body('password').notEmpty().withMessage('Password tdk boleh kosong').isLength({min: 5}).withMessage('Password minimal 5 karakter')
]

router.post('/register', validateRegister, authController.register)
router.post('/login', validateLogin, authController.login)

module.exports = router