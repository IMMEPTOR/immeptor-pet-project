let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'immeptor@gmail.com',
        pass: 'zzlkklxearfvysdt'
    }
});

module.exports = transporter;