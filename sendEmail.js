let transporter = require('./mailer');

let mailOptions = {
    from: 'immeptor@gmail.com',
    to: 'vvv643040@gmail.com',
    subject: 'Подтверждение почты',
    html: `
    <!DOCTYPE html>
<html>
<head>
    <title>Confirmation Code</title>
    <style>
    .name_company {
        font-size: 20px;
        font-family: 'Inter', sans-serif;
        background-color: black;
        color: white;
        padding: 20px 0;
        text-align: center;
        border-radius: 0 0 10px 10px
    }
    body {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .container {
        text-align: center;
        
    }

    .container_information {
        width: 100%;
        height: auto;
        text-align: center;
    }

    .title_email {
        text-align: center;
        color: #000;
        font-family: 'Kreon', sans-serif;
        font-size: 30px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }

    .code_email_send_id {
        text-align: center;
        color: #EA8106;
        font-family: 'Kreon', sans-serif;
        font-size: 25px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: .5rem;
    }
    </style>
</head>
<body>
    <div class="container">
        <p class="name_company">IMMEPTOR</p>
        <div class="container_information">
            <p class="title_email">Ваш код активации</p>
            <p class="code_email_send_id">45602716</p>
        </div>
    </div>
</body>
</html>
    `,
    headers: {
        'Content-Type': 'text/html'
    }
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error(error);
    } else {
        console.log('Email send: ' + info.response);
    }
});