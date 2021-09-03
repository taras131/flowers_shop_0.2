const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMidleware')
const basketController = require('../controllers/basketController')

router.post('/',authMiddleware, basketController.add)
router.get('/',authMiddleware, basketController.get)
router.delete('/:id',authMiddleware, basketController.delete)
router.put('/',authMiddleware, basketController.updateCount)

module.exports = router