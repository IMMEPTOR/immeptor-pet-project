let express = require('express');
let router = express.Router();

// Подключение контроллера
let controller = require('../controllers/order')



router.get('/', controller.getAll)
router.post('/', controller.create)

module.exports = router