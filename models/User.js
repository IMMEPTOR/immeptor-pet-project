let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    fullusername: {
        type: String
    },
    idTelegramUser: {
        type: String
    },
    role: {
        type: Number,
        required: true
    },
    froze: {
        type: Boolean,
        required: true
    },
    blockedAccount: {
        type: Boolean,
        required: true
    },
    idSet: {
        type: String,
        required: true
    },
    lastTime: {
        type: String,
        // required: true
    },
    timezone: {
        type: String,
        // required: true
    },
    statusOnline: {
        type: Number,
        // required: true
    },
    countEventProccess: {
        type: Number,
        // required: true
    },
})

module.exports = mongoose.model('users', userSchema)