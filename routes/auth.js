let express = require('express');
let router = express.Router();

// Подключение контроллера
let controller = require('../controllers/auth')


// localhost:3005/api/auth/login
router.post('/login', controller.login)

// localhost:3005/api/auth/register
router.post('/register', controller.register)

module.exports = router