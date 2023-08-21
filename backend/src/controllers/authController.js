const bcrypt = require('bcrypt');
const User = require('../models/user'); 
const { createSecretToken } = require('../tokenize/secretToken');

exports.register = async (req, res, next) => {
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
        next()
    }
}

// exports.verify = (req, res, next) => {
//     const token = req.headers['x-access-token']?.split(' ')[1]

//     if (token) {
//         jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//             if(err) return res.status(401).json({
//                 isLoggedIn: false,
//                 message: 'Authentikasi gagal'
//             })
//             req.user = {}
//             req.user.id = decoded.id
//             req.user.name = decoded.name
//             next()
//         })
//     } else {
//         res.status(403).json({
//             message: 'Token tidak valid',
//             isLoggedIn: false
//         })
//     }
// }