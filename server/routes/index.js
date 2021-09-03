const Router = require('express')
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')
const productRouter = require('./productRouter')
const typeRouter = require('./typeRouter')
const orderRouter = require('./orderRouter')
const settingRouter = require('./settingRouter')

const router = new Router()

router.use('/user', userRouter)
router.use('/basket', basketRouter)
router.use('/product', productRouter)
router.use('/type', typeRouter)
router.use('/order', orderRouter)
router.use('/setting', settingRouter)

module.exports = router