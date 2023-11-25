// let express = require('express');
// let https = require('https');
// let fs = require('fs');

// let PORT = process.env.PORT || 8443;
// let HOST = process.env.HOST || '';

// let app = express();

// app.use(express.json()); // Разбор тела запроса в формате JSON
// app.use(express.urlencoded({ extended: true })); // Разбор тела запроса в формате x-www-form-urlencoded

// if (process.env.NODE_ENV === 'development') {
//     app.use((err, req, res, next) => {
//         console.error(err.stack);
//         res.status(500).send('Something broke!');
//     });
// }

// // Обработка ошибок в режиме продакшн
// if (process.env.NODE_ENV === 'production') {
//     app.use((err, req, res, next) => {
//         res.status(500).send('Something went wrong!');
//     });
// }

// let options = {
//     key: fs.readFileSync('certificates/private.key'),
//     cert: fs.readFileSync('certificates/certificate.crt'),
//     // key: fs.readFileSync('ssl/key.pem'),
//     ca: fs.readFileSync('certificates/request.csr'),
//     // cert: fs.readFileSync('ssl/cert.pem')
// }

// https.createServer(options, app).listen(PORT, HOST, null, function () {
//     console.log('Server listening on port %d in %s mode', this.address().port, app.settings.env);
// });
// это HTTP сервер
let express = require('express');
let app = express();
let http = require('http');
let path = require('path');
let fs = require('fs');
// let debug = require('debug')('immeptor: server');
let server = http.createServer(app);
let bodyParser = require('body-parser')
let cors = require('cors');
app.use(cors());
let passport = require('passport');
let { Server } = require('socket.io');
let url = require('url')
let port = 3010;

let events = require('events');
let emitter = new events.EventEmitter();

let io = new Server(server, {
    transport: ['websocket'],
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize())
require('./middleware/passport')(passport)

let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');
let User = require('./models/User');
let Dialog = require('./models/Chat');
let authRotes = require('./routes/auth');
let analyticsRoutes = require('./routes/analytics')
let categoryRoutes = require('./routes/category')
let orderRoutes = require('./routes/order')
let positionRoutes = require('./routes/position')
let bcrypt = require('bcryptjs');
let errorHandler = require('./utils/errorHandler')

app.use('/api/auth', authRotes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/position', positionRoutes);

let keys = require('./config/keys')

// // остальные настройки \\



// // Настройка CORS

// app.use(cors({ origin: 'http://localhost:5173' }));

// // Настройка POST-запроса — JSON
app.use(express.json())


// // Настройка Morgen
let morgan = require('morgan');
let { disconnect } = require('process');
let { default: axios } = require('axios');
app.use(morgan('dev'));
let transporter = require('./mailer');


io.on('connection', (socket) => {
    let chatId = socket.handshake.query.chatId;
    console.log('Новое подключение:', socket.id);

    socket.on('message', (data) => {
        console.log('Получено сообщение в чате:', data);

        io.in(chatId).emit('message', data);
    })

    socket.on('disconnect', () => {
        console.log('Подключение разорвано:', socket.id);
    })

    socket.join(chatId);
})
let activeSockets = new Set();

function escapeRegExp(input) {
    return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

let containerUserConected = 0;
let networkAdminsNowCount = 0;
let controllerAuth = require('./controllers/auth');
let dayjs = require('dayjs');
let utc = require('dayjs/plugin/utc');

dayjs.extend(utc);
let countConnectedAdmins = controllerAuth.countAuth;

let containerSocketAdmin = [];

io.on('connection', (socket) => {
    addConnectedSocket(socket);

    socket.on('status_online', async (room) => {
        console.log(room, "сокетики")

        let roomStatus = room.id_sender + '_status';
        socket.join(roomStatus);

        let user = await User.findOne({ _id: room.id_sender });
        if (user) {
            io.to(`${roomStatus}`).emit(`status_online_${room.id_sender}`, {
                status: user.statusOnline,
                time: user.lastTime,
            });
        } else {
            console.log('пользователь тестово не найден сотики');
        }
    })

    socket.on('user-disconnect-exit', async (room) => {
        console.log("Отключаемся нахуй с ним -", room)

        let secretKey = 'dev_jwt';
        let decoded = '';
        let tokenWithPrefix = room.id;
        try {
            let token = tokenWithPrefix.replace('Bearer ', '');
            let tokening = token.replace('cookieName=', '');
            decoded = jwt.verify(tokening, secretKey);
        } catch (e) {
            console.log(e);
        }

        console.log(decoded)

        let user = await User.findOne({ _id: decoded.userId });

        // let user = await User.findOne({_id: room.key.userId});
        if (user && user.countEventProccess > 0) {
            user.countEventProccess -= 1;
            if (user.countEventProccess == 0) {
                let time = room.time;
                let roomStatus = user._id + '_status';
                user.lastTime = time;
                user.statusOnline = 0;

                io.to(`${roomStatus}`).emit(`status_online_${user._id}`, {
                    status: user.statusOnline,
                    time: user.lastTime,
                });
            }


            await user.save();
        } else {
            console.log("Пучек выпал далеко")
        }
    })

    socket.on('user-delete-status-exit', async (room) => {
        console.log("Отключаемся нахуй с ним -", room)

        let secretKey = 'dev_jwt';
        let decoded = '';
        let tokenWithPrefix = room.id;
        try {
            let token = tokenWithPrefix.replace('Bearer ', '');
            let tokening = token.replace('cookieName=', '');
            decoded = jwt.verify(tokening, secretKey);
        } catch (e) {
            console.log(e);
        }

        console.log(decoded)

        let user = await User.findOne({ _id: decoded.userId });
        let time = room.time;

        // let user = await User.findOne({_id: room.key.userId});
        if (user) {
            user.countEventProccess = 0;
            if (user.countEventProccess == 0) {
                let time = room.time;
                let roomStatus = user._id + '_status';
                user.lastTime = time;
                user.statusOnline = 0;

                io.to(`${roomStatus}`).emit(`status_online_${user._id}`, {
                    status: user.statusOnline,
                    time: user.lastTime,
                });
            }


            await user.save();
        } else {
            console.log("Пучек выпал далеко")
        }
    })



    socket.on('user-disconnecting', async (room) => {
        console.log("Отключаемся нахуй с ним -", room)

        let user = await User.findOne({ _id: room.key.userId });
        if (user) {
            user.countEventProccess -= 1;
            if (user.countEventProccess == 0) {
                let time = room.time;
                let roomStatus = room.key.userId + '_status';
                user.lastTime = time;
                user.statusOnline = 0;

                io.to(`${roomStatus}`).emit(`status_online_${room.key.userId}`, {
                    status: user.statusOnline,
                    time: user.lastTime,
                });
            }


            await user.save();
        } else {
            console.log("Пучек выпал далеко")
        }
    })

    socket.on('roomStatusEvent', async (room) => {

        let secretKey = 'dev_jwt';
        let decoded = '';
        let tokenWithPrefix = room.id;
        try {
            let token = tokenWithPrefix.replace('Bearer ', '');
            let tokening = token.replace('cookieName=', '');
            decoded = jwt.verify(tokening, secretKey);
        } catch (e) {
            console.log(e);
        }

        console.log(decoded)

        let user = await User.findOne({ _id: decoded.userId });
        let time = room.time;

        if (user) {
            console.log("Пользователь найден")
            user.statusOnline = 1;
            user.lastTime = time;

            if (!user.countEventProccess) {
                user.countEventProccess = 0;
            }
            user.countEventProccess += 1;
            if (user.countEventProccess == 1) {
                let roomStatus = user._id + '_status';
                io.to(`${roomStatus}`).emit(`status_online_${user._id}`, {
                    status: user.statusOnline,
                    time: user.lastTime,
                });
            }
            await user.save();
        } else {
            console.log("Пользователь не найден в сокетах для статусов")
        }

    })

    socket.on('feedRoom', (room) => {
        socket.join('feedRoomlastMes');

        let roomsearchAdmin = socket.id + '_f_pers';
        console.log(roomsearchAdmin, 'Пользователь был подключен к комнате для работы с запросами поиска людей')
        socket.join(roomsearchAdmin)
    })

    socket.on('AdminConnectRoom', async (room) => {
        networkAdminsNowCount += 1;
        socket.join('AdminRoom')
        console.log(`Пользователь - ${socket.id}, подключен к админпстративному каналу`);

        containerSocketAdmin.push(socket.id);
        let CountRegisterUser = await User.find();
        let CountConnectedUser = containerUserConected;
        let AdminsNetWork = networkAdminsNowCount;

        let secretKey = 'dev_jwt';
        let decoded = '';
        let tokenWithPrefix = room;
        try {
            let token = tokenWithPrefix.replace('Bearer ', '');
            let tokening = token.replace('cookieName=', '');
            decoded = jwt.verify(tokening, secretKey);
        } catch (e) {
            console.log(e);
        }

        console.log(decoded)

        let roomsearchAdmin = socket.id + '_ads';
        console.log(roomsearchAdmin)
        socket.join(roomsearchAdmin)
        let userBasic = await User.findOne({ _id: decoded.userId });

        io.to('AdminRoom').emit('AdminClubInformationRoomFeed', {
            register: CountRegisterUser.length,
            connectedUser: CountConnectedUser,
            AdminsConnected: AdminsNetWork,
            token: decoded
        })
    })

    socket.on('searchAdminUserPanelInfo', async (data) => {
        let text = data;
        let escapedUsername = escapeRegExp(text);
        let results = null;
        if (text) {
            results = await User.find({
                $or: [
                    { idSet: { $regex: escapedUsername } },
                    { fullusername: { $regex: escapedUsername, $options: 'i' } },
                    { email: { $regex: escapedUsername, $options: 'i' } },
                ],
            }).limit(3);
            let assemblyRoomAdmin = socket.id + '_ads';
            io.to(`${assemblyRoomAdmin}`).emit('SearchAdminUserInfo', {
                users: results
            })
        }
    })

    socket.on('leaveAdminsRoom', (room) => {
        networkAdminsNowCount -= 1;
        socket.leave('AdminRoom');
        console.log('Пользователь!')
        io.to('AdminRoom').emit('AdminUpdateInfoOnlineAdministration', {
            adminsConnect: networkAdminsNowCount
        })
    })

    socket.on('joinRoom', (room) => {
        socket.join(room)
        console.log(`${socket.id} joined room: ${room}`)
        console.log(socket.rooms);
    });
    socket.on('searchFeedPerson', async (data) => {
        let username = data;
        let users = null;
        let escapedUsername = escapeRegExp(username);
        let usernameRegex = new RegExp(escapedUsername, 'i');
        if (username) {
            users = await User.find({
                fullusername: usernameRegex
            }).limit(5);
        }

        let roomsearchAdmin = socket.id + '_f_pers';
        io.to(`${roomsearchAdmin}`).emit('chatMessagerSearchInput', {
            users: users
        })
    });
    socket.on('chat message', async (data) => {
        let chatId = data.chatId;
        let userId = data.userId;
        let message = data.message;
        let timen = data.time;
        let chat = await Dialog.findOne({ _id: chatId });
        // let user = await User.findOne({_id: userId})
        // if (user) {
        //     region = user.timezone;
        // }
        if (chat) {
            chat.messages.push({
                senderId: userId,
                message: message,
                time: timen,
            });
            let lastMes = message.slice(0, 18);
            if (message.length > 18) {
                lastMes = lastMes + '...';
            }
            chat.lastmessage = lastMes;
            chat.lastTime = timen;
            if (chat.set_mark == 1) {
                chat.user_two = chat.time_two_user;
                chat.set_mark = 0;
                io.to('feedRoomlastMes').emit('foreverchatuserme', chat);
            }
            await chat.save();
            io.to(chatId).emit('newMessage', {
                user: userId,
                message: message,
                time: timen,
            });
            io.to('feedRoomlastMes').emit('lastMessageSearch', {
                chatId: chatId,
                text: lastMes,
                lastTime: timen,
            });
        }
    })

    socket.on('updateinputchat', async (data) => {
        console.log(data);
        let iUser = await User.findOne({ _id: data.idIUser.userId });
        console.log(data);
        let dontwentTemp = false;
        if (iUser._id == data.id) {
            dontwentTemp = true
        } else {
            let chats = await Dialog.find({
                $expr: {
                    $or: [
                        { $eq: ["$user_one", iUser._id] },
                        { $eq: ["$user_two", iUser._id] },
                        { $eq: ["$time_two_user", iUser._id] }
                    ]
                }
            });
            for (let i = 0; i < chats.length; i++) {
                let chat = chats[i];
                if (chat.user_one == data.id || chat.user_two == data.id || chat.time_two_user == data.id) {
                    dontwentTemp = true;
                }
                if (chat.set_mark == 1 && chat.time_two_user == iUser._id) {
                    chat.user_two = chat.time_two_user;
                    dontwentTemp = true;

                    console.log("Чат повторяется и не будет сохранен но будет отрендарен");
                    io.to('feedRoomlastMes').emit('newdialogFromInputSecond', {
                        chat: chat,
                        senderId: data.id,
                    });
                    chat.set_mark = 0;
                    await chat.save();
                }
            }
        }
        if (iUser && !dontwentTemp) {
            let dialog = new Dialog({
                user_one: iUser._id,
                username_one: iUser.name,
                surname_one: iUser.surname,
                user_two: '',
                username_two: data.name,
                surname_two: data.surname,
                time_two_user: data.id,
                lastmessage: '',
                set_mark: 1,
                messages: [],
                lastTime: "",
            });
            await dialog.save();
            io.to('feedRoomlastMes').emit('sendnewdualoginput', dialog);
        } else {
            console.log('__Объект чата не создан при следущей проверку выше__');
        }
    })
    socket.on('leaveRoom', (room) => {
        socket.leave(room);
        console.log(`${socket.id} left room: ${room}`)
    })
    socket.on('disconnect', async (data) => {
        // let userId = socket.handshake.headers.cookie;
        // console.log(userId);
        // Используйте userId при отключении
        // console.log(`Пользователь ${data} отключился`);
        // removeDisconnectedSocket(socket.id);
        let userId = socket.handshake.query.cookie; // вся соль здесь
        // let userId = socket.handshake.headers.cookie; // вся соль здесь
        let ServerTime = socket.handshake.query.time;

        // Получаем текущую дату и время
        // let ServerTime = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

        // Преобразовываем в UTC
        // let utcDate = currentDate.utc();
        console.log(`Пользователь ${userId} нас покинул`);

        let secretKey = 'dev_jwt';
        let decoded = '';
        let tokenWithPrefix = userId;

        try {
            let token = tokenWithPrefix.replace('Bearer ', '');
            let tokening = token.replace('cookieName=', '');
            decoded = jwt.verify(tokening, secretKey);
        } catch (e) {
            console.log(e);
        }

        console.log(decoded)

        let user = await User.findOne({ _id: decoded.userId });
        if (user) {
            if (user.countEventProccess > 0) {
                user.countEventProccess -= 1;
                if (user.countEventProccess == 0) {
                    let time = ServerTime;
                    let roomStatus = user._id + '_status';
                    user.lastTime = time;
                    user.statusOnline = 0;

                    io.to(`${roomStatus}`).emit(`status_online_${user._id}`, {
                        status: user.statusOnline,
                        time: user.lastTime,
                    });
                }
                await user.save();
            }
        } else {
            console.log("Пучек выпал далеко")
        }
    });

    socket.on('disconnecting', async (data) => {
        // let userId = socket.handshake.headers.cookie; // вся соль здесь
        // let ServerTime = socket.handshake.query.time;

        // // Получаем текущую дату и время
        // // let ServerTime = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

        // // Преобразовываем в UTC
        // // let utcDate = currentDate.utc();
        // console.log(`ну и ну ${data}`);

        // let secretKey = 'dev_jwt';
        // let decoded = '';
        // let tokenWithPrefix = userId;

        // try {
        //     let token = tokenWithPrefix.replace('Bearer ', '');
        //     let tokening = token.replace('cookieName=', '');
        //     decoded = jwt.verify(tokening, secretKey);
        // } catch (e) {
        //     console.log(e);
        // }

        // console.log(decoded)

        // let user = await User.findOne({ _id: decoded.userId });
        // if (user) {
        //     if (user.countEventProccess > 0) {
        //         user.countEventProccess -= 1;
        //         if (user.countEventProccess == 0) {
        //             let time = ServerTime;
        //             let roomStatus = user._id + '_status';
        //             user.lastTime = time;
        //             user.statusOnline = 0;

        //             io.to(`${roomStatus}`).emit(`status_online_${user._id}`, {
        //                 status: user.statusOnline,
        //                 time: user.lastTime,
        //             });
        //         }
        //         await user.save();
        //     }
        // } else {
        //     console.log("Пучек выпал далеко")
        // }
    });

});

let addConnectedSocket = (socket) => {
    activeSockets.add(socket.id);
    console.log(`Пользователь подключен:`, socket.id);
    containerUserConected += 1;
    io.to('AdminRoom').emit('AdminUpdateInfoConnected', {
        connectedUser: containerUserConected
    })
}

let removeDisconnectedSocket = (socketId) => {
    for (let i = 0; i < containerSocketAdmin.length; i++) {
        let element = containerSocketAdmin[i];
        if (element == socketId) {
            networkAdminsNowCount -= 1;
            io.to('AdminRoom').emit('AdminUpdateInfoOnlineAdministration', {
                adminsConnect: networkAdminsNowCount
            })
            console.log('Админ вышел..')
        }
    }
    activeSockets.delete(socketId);
    console.log(`Пользователь отключен:`, socketId);
    containerUserConected -= 1;
    io.to('AdminRoom').emit('AdminUpdateInfoConnected', {
        connectedUser: containerUserConected
    })
}

server.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});

// Настройка БД
mongoose.connect(keys.mongoURI)
    .then(() => console.log('MongoDB conected.'))
    .catch(error => console.log(error))


app.post('/api/takingproogds/setpol/dialogs/retate/user', async function (req, res) {
    let id = req.body.id;
    let chat = await Dialog.findOne({ _id: id });

    if (chat) {
        res.send(chat);
    } else {
        console.log('Чат не найден!');
    }
})

app.post('/api/sec/email/to/registration/plkgohyftsf/redot/of/regostration', async function (req, res) {
    let email = req.body.email;
    let obj = await User.findOne({ email: email });
    if (obj) {
        res.status(200).json({ code: 397 });
    } else {
        res.status(200).json({ code: 398 });
    }
})

app.post('/api/send/email/code', function (req, res) {
    let code = req.body.code;
    let email = req.body.email;
    let mailOptions = {
        from: '<immeptor@xmail.ru>',
        to: `${email}`,
        subject: 'Подтвердите почту',
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
                <p class="code_email_send_id">${code}</p>
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
    console.log(code);
});

app.post('/api/send/email/vhoin', async function (req, res) {
    let email = req.body.email;
    let timezone = req.body.zone;
    let time = req.body.time;

    let user = await User.findOne({ email: email });

    let dateTimeFormat = new Intl.DateTimeFormat('ru-RU', { timeZone: timezone });

    // Получите информацию о временной зоне с использованием resolvedOptions()
    let timeZoneOptions = dateTimeFormat.resolvedOptions();

    // Преобразуйте временную зону в требуемый формат
    let formattedTimeZone = timeZoneOptions.timeZone.replace('/', ', ');



    // let formattedDate = time.;

    if (user) {
        let mailOptions = {
            from: '<immeptor@xmail.ru>',
            to: `${email}`,
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
                    <p class="title_email">Здравствуйте, ${user.name}!</p>
                    <p class="description_email">В ваш аккаунт был произведен вход</p>
                </div>
                <div class="container_geolocation">
                    <p class="text_geoinfo">Местоположение:</p>
                    <p class="container_data_geoinfo">${formattedTimeZone}, ${time}</p>
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
        res.send(200);
    }
})

app.post('/api/getprofile', async function (req, res) {
    let secretKey = 'dev_jwt';
    let decoded = '';
    let tokenWithPrefix = req.body.token;
    try {
        let token = tokenWithPrefix.replace('Bearer ', '');
        let tokening = token.replace('cookieName=', '');
        decoded = jwt.verify(tokening, secretKey);
    } catch (e) {
        console.log(e);
    }

    if (decoded) {
        let user = await User.findOne({ _id: decoded.userId });
        res.send(user.fullusername)
    } else {
        console.log('Неверный токен или истекло время действия')
    }
})

app.post('/api/getdialogs', async function (req, res) {
    let secretKey = 'dev_jwt';
    let decoded = '';
    let tokenWithPrefix = req.body.token;
    try {
        let token = tokenWithPrefix.replace('Bearer ', '');
        let tokening = token.replace('cookieName=', '');
        decoded = jwt.verify(tokening, secretKey);
    } catch (e) {
        console.log(e);
    }

    let chats = await Dialog.find({
        $expr: {
            $or: [
                { $eq: ["$user_one", decoded.userId] },
                { $eq: ["$user_two", decoded.userId] }
            ]
        }
    });
    if (chats) {
        res.send(chats);
    } else {
        console.log("Чаты не найдены!")
    }

    // console.log(chats);
})

app.post('/api/admin/search/user', async function (req, res) {
    let id = req.body.id;
    let user = await User.findOne({ _id: id });

    res.send(user);
})

app.post('/api/gettoken', async function (req, res) {
    let secretKey = 'dev_jwt';
    let decoded = '';
    let tokenWithPrefix = req.body.token;
    try {
        let token = tokenWithPrefix.replace('Bearer ', '');
        let tokening = token.replace('cookieName=', '');
        decoded = jwt.verify(tokening, secretKey);
    } catch (e) {
        console.log(e);
    }
    if (decoded) {
        let user = await User.findOne({ _id: decoded.userId });
        if (user) {
            if (user.froze || user.blockedAccount) {
                console.log('Аккаунт ограничен в правах!')
                res.status(200).json({ status: 100 })
            } else {
                res.status(200).json({ status: 105, decoded: decoded })
            }
        } else {
            console.log('Пользователь не найден по токену!')
        }
    } else {
        console.log('Токен не найден или не раскодирован!')
    }
})

app.post('/api/information/administration/go/update/information/user', async function (req, res) {
    let Updateuser = req.body.user;

    let user = await User.findOne({ _id: Updateuser.id });

    // let chats = await User.find({
    //     $or: [
    //         { user_one: { $regex: Updateuser.id } },
    //         { user_two: { $regex: Updateuser.id } }
    //     ],
    // });
    let chats = await Dialog.find({
        $expr: {
            $or: [
                { $eq: ["$user_one", Updateuser.id] },
                { $eq: ["$user_two", Updateuser.id] }
            ]
        }
    });

    // console.log(chats);



    user.name = Updateuser.name;
    user.surname = Updateuser.surname;
    user.email = Updateuser.email;
    user.role = Updateuser.role;
    user.froze = Updateuser.froze;
    user.blockedAccount = Updateuser.blocked;
    user.fullusername = `${Updateuser.name} ${Updateuser.surname}`

    if (chats) {

        for (let i = 0; i < chats.length; i++) {
            let chat = chats[i];
            console.log(chat)
            if (chat.user_one == Updateuser.id) {
                chat.username_one = Updateuser.name;
                chat.surname_one = Updateuser.surname;
            }

            if (chat.user_two == user._id) {
                chat.username_two = Updateuser.name;
                chat.surname_two = Updateuser.surname;
            }
            await chat.save();
        }
    }
    await user.save();
    res.send(200)
})

app.post('/api/message/saveindatebase/dialogs/users/config', async function (req, res) {
    let text = req.body.text;
    let id = req.body.id;
    let chatId = req.body.chatId;

    let dialog = await Dialog.findOne({ _id: chatId });
    if (dialog) {
        dialog.messages.push({
            senderId: id,
            message: text
        });
        let lastMes = text.slice(0, 18);
        if (text.length > 18) {
            lastMes = lastMes + '...';
        }

        // console.log(lastMes + '...');

        dialog.lastmessage = lastMes;
        await dialog.save();
        res.status(200);
    } else {
        res.json('Чат не неайден!')
    }
});

app.post('/api/configuration/auth/examination/token/user', async function (req, res) {
    let secretKey = 'dev_jwt';
    let decoded = '';
    let tokenWithPrefix = req.body.token;
    try {
        let token = tokenWithPrefix.replace('Bearer ', '');
        let tokening = token.replace('cookieName=', '');
        decoded = jwt.verify(tokening, secretKey);
    } catch (e) {
        console.log(e);
    }

    let user;
    if (decoded) {
        user = await User.findOne({ _id: decoded.userId });
    }

    if (user) {
        if (user.froze || user.blockedAccount) {
            console.log('Аккаунт ограничен в правах!')
            res.status(200).json({ status: 100 })
        } else {
            res.status(200).json({ status: 105, user: user, decoded: decoded })
        }
    } else {
        console.log('Пользователь не найден, страница профиль')
    }
});

app.post('/api/delete/configuration/jwt/tokenauth', function (req, res) {
    res.clearCookie('cookieName');
    res.send('Cookie удалена');
})

app.post(`/api/users/search`, async function (req, res) {
    let username = req.body.username;

    let users = null;
    if (username) {
        users = await User.find({
            fullusername: { $regex: new RegExp(username, 'i') }
        }).limit(5);
    }

    res.send(users);
});

app.post(`/api/save/newdialogs/chat/settings/podt`, async function (req, res) {
    let senderUser = req.body.user;
    let iUser = req.body.token;


    let dontwentTemp = false;
    if (iUser._id == senderUser._id) {
        dontwentTemp = true
    } else {
        let chats = await Dialog.find({
            $expr: {
                $or: [
                    { $eq: ["$user_one", iUser._id] },
                    { $eq: ["$user_two", iUser._id] }
                ]
            }
        });

        for (let i = 0; i < chats.length; i++) {
            let chat = chats[i];
            if (chat.user_one == senderUser._id || chat.user_two == senderUser._id) {
                // console.log('ошибка создания чата')
                dontwentTemp = true;
            }
        }
    }

    if (!dontwentTemp) {
        let dialog = new Dialog({
            user_one: iUser._id,
            username_one: iUser.name,
            surname_one: iUser.surname,
            user_two: senderUser._id,
            username_two: senderUser.name,
            surname_two: senderUser.surname,
            lastmessage: '',
            messages: []
        })

        await dialog.save();
        res.send(dialog);
    } else {
        res.status(401)
    }
})


app.post(`/api/set/search/dialog/id/new`, async function (req, res) {
    let idChat = req.body.id;
    let chat = await Dialog.findOne({ _id: idChat });

    if (chat) {
        res.send(chat.messages);
    } else {
        res.status(404);
    }
});

app.post(`/api/telegram/assistant/routesset/auth/provived/email`, async function (req, res) {
    // console.log(req.body.email);
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        res.json({
            name: 200
        });
    } else {
        console.log('пользователь не найден,к сожалению');
        res.json({
            name: 401
        });
    }
    console.log(user)
})

app.post('/api/telegram/assistant/routesset/auth/user/insys/item', async function (req, res) {
    let candidate = await User.findOne({ email: req.body.email });
    if (candidate) {
        // Проверка пароля, пользователь сществует
        let passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            // Пароли совпали, генерация токена
            res.json({
                name: candidate.name,
                surname: candidate.surname,
                status: 200
            });
        } else {
            // Пароли не совпали
            res.json({
                status: 401
            })
        }
    } else {
        // Пользователя нет, ошибка
        res.json({
            status: 404
        })
    }
})

// long-polling

// app.get('/get-messages', (req, res) => {
//     emitter.once('newMessage', (message) => {
//         res.json(message)
//     })
// })

// app.post('/new-messages', ((req, res) => {
//     const message = req.body;
//     emitter.emit('newMessage', message)
//     res.status(200)
// }))

app.post('/api/change/person/information/utrp/cp/do', async function (req, res) {
    let name = req.body.name;
    let surname = req.body.surname;
    let userId = req.body.idUser;

    let user = await User.findOne({ _id: userId });

    let chats = await Dialog.find({
        $expr: {
            $or: [
                { $eq: ["$user_one", userId] },
                { $eq: ["$user_two", userId] }
            ]
        }
    });

    if (chats) {

        for (let i = 0; i < chats.length; i++) {
            let chat = chats[i];
            console.log("Изменяем имена в чатах")
            if (chat.user_one == user._id) {
                chat.username_one = name;
                chat.surname_one = surname;

            }

            if (chat.user_two == user._id) {
                chat.username_two = name;
                chat.surname_two = surname;
            }
            await chat.save();
        }
    }

    if (user) {
        user.name = name;
        user.surname = surname;
        user.fullusername = `${name} ${surname}`

        try {
            await user.save();
            res.status(200).json({ status: 465 });
        } catch (e) {
            console.log(e);
        }
    } else {
        console.log('user dont search')
    }
})

app.post('/api/send/info/change/email/configeration/person/info', async function (req, res) {
    let email = req.body.email;
    let id = req.body.id;
    let user = await User.findOne({ _id: id });

    if (user) {
        user.email = email;
        await user.save();

        res.send({ status: 3802 });
    } else {
        console.log("Пользователь не найден")
    }
})

app.post('/api/send/change/password/user', async function (req, res) {
    let id = req.body.id;
    let password = req.body.password;

    let user = await User.findOne({ _id: id });
    if (user) {
        console.log("Пользователь нашелся!")
        let salt = bcrypt.genSaltSync(10);
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let userId = '';
        let charactersLength = characters.length;

        for (let i = 0; i < 10; i++) {
            let randomIndex = Math.floor(Math.random() * charactersLength);
            userId += characters.charAt(randomIndex);
        }

        user.password = bcrypt.hashSync(password, salt);

        try {
            await user.save();
            console.log("Пароль был сохранен!")
            res.send({ status: 38293 });
        } catch (e) {
            // Обработать ошибку
            errorHandler(res, e)
        }
    } else {
        console.log("Пользователь не найден")
    }
})