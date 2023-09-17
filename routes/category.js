let express = require('express');
let passport = require('passport');
let router = express.Router();

// Подключение контроллера
let controller = require('../controllers/category')


router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/:id', controller.getById)
router.delete('/:id', controller.remove)
router.post('/', controller.create)
router.patch('/:id', controller.update)

module.exports = router