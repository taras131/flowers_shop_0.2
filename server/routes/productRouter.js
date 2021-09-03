const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const checkRoleMiddleware = require('../middleware/chekRoleMiddleware')

router.post('/', checkRoleMiddleware('ADMIN'), productController.create)
router.get('/', productController.get)
router.get('/get_one/:id', productController.getOne)
router.get('/get_all', checkRoleMiddleware('ADMIN'), productController.getAll)
router.put('/', checkRoleMiddleware('ADMIN'), productController.update)
router.delete('/delete_product/:id', checkRoleMiddleware('ADMIN'), productController.delete)

module.exports = router