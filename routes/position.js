let express = require('express');
let router = express.Router();

// Подключение контроллера
let controller = require('../controllers/position')


router.get('/:categoryId', controller.getByCategoryId)
router.post('/', controller.create)
router.patch('/:id', controller.update)
router.delete('/:id', controller.remove)

module.exports = router