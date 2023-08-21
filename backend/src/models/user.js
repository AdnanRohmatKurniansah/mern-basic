const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const bcrypt = require('bcrypt')

const User = new Schema({
    name: {
        type: String,
        required: [true, 'Nama anda kosong'],
    },
    email: {
        type: String,
        required: [true, 'Email anda kosong'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password anda kosong'],
    },
}, {
    timestamps: true
})

User.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 12)
})

module.exports = mongoose.model('User', User)