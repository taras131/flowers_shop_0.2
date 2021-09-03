const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMidleware')
const checkRoleMiddleware = require('../middleware/chekRoleMiddleware')

router.post('/', authMiddleware, orderController.create)
router.get('/', authMiddleware, orderController.get)
router.delete('/:id', authMiddleware, orderController.delete)
router.get('/get_one/:id', authMiddleware, orderController.getOne)
router.get('/get_all/:status', checkRoleMiddleware('ADMIN'), orderController.getAll)
router.put('/update_status/', checkRoleMiddleware('ADMIN'), orderController.updateStatus)

module.exports = router