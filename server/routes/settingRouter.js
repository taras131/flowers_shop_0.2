const Router = require('express')
const router = new Router()
const settingController = require('../controllers/settingController')
const checkRoleMiddleware = require('../middleware/chekRoleMiddleware')

router.put('/', checkRoleMiddleware('ADMIN'), settingController.set)
router.get('/', settingController.get)

module.exports = router