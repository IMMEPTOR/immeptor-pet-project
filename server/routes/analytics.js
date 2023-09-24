let express = require('express');
let router = express.Router();

// Подключение контроллера
let controller = require('../controllers/analytics')

router.get('/overview', controller.overview)
router.get('/analytics', controller.analytics)

module.exports = router