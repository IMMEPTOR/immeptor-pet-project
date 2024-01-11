let nodemailer = require('nodemailer');

// let transporter = nodemailer.createTransport({
//     service: 'Mail',
//     auth: {
//         user: 'immeptor@xmail.ru',
//         pass: 'EeBnHkzc0SnfwmCeSt1r'
//     }
// });

let transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'immeptor@xmail.ru',
        pass: 'EeBnHkzc0SnfwmCeSt1r',
    },
    tls: {
        rejectUnauthorized: false,
    },
});

module.exports = transporter;