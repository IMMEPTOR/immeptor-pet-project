let bcrypt = require('bcryptjs');
let User = require('../models/User');
let jwt = require('jsonwebtoken');
const keys = require('../config/keys');
let errorHandler = require('../utils/errorHandler')


module.exports.login = async function (req, res) {
    let candidate = await User.findOne({ email: req.body.email });
    let tz = req.body.tz;
    if (candidate) {
        // Проверка пароля, пользователь сществует
        let passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            // Пароли совпали, генерация токена
            if (candidate.blockedAccount) {
                res.status(200).json({status: 398});
            } else if (candidate.froze) {
                res.status(200).json({status: 129});
            } else {
                let token = jwt.sign({
                    email: candidate.email,
                    userId: candidate._id,
                    role: candidate.role,
                    froze: candidate.froze,
                    blockedAccount: candidate.blockedAccount,
                    timeZone: tz,
                }, keys.jwt, { expiresIn: 60 * 60 * 12 * 100 });
    
                candidate.timezone = tz;

                await candidate.save();
                res.status(200).json({ token: `Bearer ${token}` });
            }
        } else {
            // Пароли не совпали
            res.status(200).json({ status: 401 });
        }
    } else {
        // Пользователя нет, ошибка
        res.status(200).json({ status: 365})
    }
}

module.exports.register = async function (req, res) {
    // email password
    let candidate = await User.findOne({ email: req.body.email });

    if (candidate) {
        // Пользователь существует, нужно отдать ошибку  
        res.status(409).json({ message: 'Такой Email уже занят, попробуйте другой' })
    } else {
        // Нужно создать пользователя
        let salt = bcrypt.genSaltSync(10);
        let password = req.body.password;


        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let userId = '';
        let charactersLength = characters.length;

        for (let i = 0; i < 10; i++) {
            let randomIndex = Math.floor(Math.random() * charactersLength);
            userId += characters.charAt(randomIndex);
        }
        let user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
            name: req.body.username,
            surname: req.body.surname,
            fullusername: `${req.body.username} ${req.body.surname}`,
            role: 1,
            froze: false,
            blockedAccount: false,
            idSet: userId,
            timezone: req.body.tz,
            countEventProccess: 0,
        })

        try {
            await user.save();
            this.countAuth += 1;
            res.status(201).json(user)
        } catch (e) {
            // Обработать ошибку
            errorHandler(res, e)
        }

    }
}

module.exports.countAuth = 0;