const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const user = require('../models/user'); 

exports.register = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const err = new Error('Invalid value');
        err.errorStatus = 400;
        err.data = errors.array();
        return next(err);
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    user.findOne({
        email: email,
    })
    .then((takenEmail) => {
        if (takenEmail) {
            return res.status(409).json({
                message: 'Email sudah ada',
            });
        } else {
            return bcrypt.hash(password, 12);
        }
    })
    .then((hashedPassword) => {
        const register = new user({
            name: name,
            email: email,
            password: hashedPassword,
        });
        return register.save();
    })
    .then((result) => {
        res.status(201).json({
            message: 'Registrasi berhasil',
            data: result,
        });
    })
    .catch(err => {
        console.log(err)
    });
};

exports.login = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const err = new Error('Invalid value');
        err.errorStatus = 400;
        err.data = errors.array();
        return next(err);
    }

    const email = req.body.email
    const password = req.body.password

    user.findOne({
        email: email
    })
    .then(dbUser => {
        if (!dbUser) {
            return res.status(400).json({
                message: 'Login failed'
            })
        }   
        bcrypt.compare(password, dbUser.password)
        .then(isCorrect => {
            if (isCorrect) {
                const payload = {
                    id: dbUser._id,
                    name: dbUser.name
                }
                jwt.sign(
                    payload,
                    process.env.SECRET_KEY,
                    {expiresIn: 86400},
                    (err, token) => {
                        if (err) return res.status(500).json({
                            message: err
                        })
                        return res.status(201).json({
                            message: 'Login berhasil',
                            token: 'Bearer ' + token
                        })
                    }
                )
            } else {
                return res.status(401).json({
                    message: 'Login failed'
                })
            }
        })
    })
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