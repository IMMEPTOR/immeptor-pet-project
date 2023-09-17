let mongoose = require('mongoose');

let dialogSchema = new mongoose.Schema({
    user_one: {
        type: String,
        required: true,
    },
    username_one: {
        type: String,
        required: true
    },
    surname_one: {
        type: String,
        required: true
    },
    user_two: {
        type: String,
        required: true
    },
    username_two: {
        type: String,
        required: true
    },
    surname_two: {
        type: String,
        required: true
    },
    user_two: {
        type: String,
        // required: true
    },
    lastmessage: {
        type: String,
    },
    time_two_user: {
        type: String,
    },
    set_mark: {
        type: Number,
    },
    messages: [
        {
            senderId: {
                type: String
            },
            message: {
                type: String
            }
        }
    ]
})

module.exports = mongoose.model('dialogs', dialogSchema)