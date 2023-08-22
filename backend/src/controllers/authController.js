const bcrypt = require('bcrypt');
const User = require('../models/user'); 
const { createSecretToken } = require('../tokenize/secretToken');
const { validationResult } = require('express-validator');

exports.register = async (req, res, next) => {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Invalid value',
            errors: errors.array()
        });
    }

    try {
        const { name, email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({
                message: 'Email sudah ada'
            })
        }
        const user = await User.create({ name, email, password })
        
        res.status(201).json({
            message: 'Registrasi berhasil',
            success: true,
            data: user
        })
        next()
    } catch (error) {
        res.status(500).json({
            message: error
        })
        next()
    }
};

exports.login = async (req, res, next) => {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Invalid value',
            errors: errors.array()
        });
    }

    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(409).json({
                message: 'Email tdk ditemukan'
            })
        }
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            const token = createSecretToken(user._id)
            return res.status(201).json({ 
                message: "Berhasil login", 
                success: true,
                token: "Bearer " + token
            });
        } else {
            return res.status(401).json({
                message: 'Login gagal'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}