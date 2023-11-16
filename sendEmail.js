let transporter = require('./mailer');

let mailOptions = {
    from: 'immeptor@gmail.com',
    to: 'vvv643040@gmail.com',
    subject: 'Замечена новая активность',
    html: `
    <!DOCTYPE html>
<html>
<head>
    <title>New Vhoin Account</title>
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
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .container {
        text-align: center;
        margin-bottom: 10px;
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

    .description_email {
        text-align: center;
        color: #000;
        font-family: 'Kreon', sans-serif;
        font-size: 22px;
        font-style: normal;
        font-weight: 550;
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

    .container_geolocation {
        width: auto;
        height: auto;

        text-align: center;
        display: inline;
        border-radius: 10px;
        background-color: #000;
        box-shadow: 1px 1px 16.1px -4px rgba(0, 0, 0, 0.25);
    }

    .text_geoinfo {
        color: #6167FF;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }

    .container_data_geoinfo {
        
        color: #232323;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
    </style>
</head>
<body>
    <div class="container">
        <p class="name_company">IMMEPTOR</p>
        <div class="container_information">
            <p class="title_email">Здравствуйте, Виктория!</p>
            <p class="description_email">В ваш аккаунт был произведен вход</p>
        </div>
        <div class="container_geolocation">
            <p class="text_geoinfo">Местоположение:</p>
            <p class="container_data_geoinfo">Europa, Moscow, 19.11.2023 20:18</p>
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