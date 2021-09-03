const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMidleware')
const checkRoleMiddleware = require('../middleware/chekRoleMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth',authMiddleware, userController.chek)
router.get('/get_one_user/:id',checkRoleMiddleware('ADMIN'), userController.getOne)
router.get('/get_all_user/',checkRoleMiddleware('ADMIN'), userController.getAll)

module.exports = router