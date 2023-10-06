const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email is required']
    }, 
    phoneNumber: {
        type: String,
        unique: true,
        required: [true, 'email is required']
    }, 
    password: {
        type: String,
        required: [true, 'password is required']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isDoctor: {
        type: Boolean, 
        default: false,
    },
    notification: {
        type: Array,
        default: []
    },
    seennotification: {
        type: Array,
        default: []
    },
    emailverificationToken: {
        type: String,
        defaultl: ''
    },
    verified: {
        type: Boolean,
        default: false
    },
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

module.exports = User