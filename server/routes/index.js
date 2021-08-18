const Router = require('express')
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')
const productRouter = require('./productRouter')
const typeRouter = require('./typeRouter')

const router = new Router()

router.use('/user', userRouter)
router.use('/basket', basketRouter)
router.use('/product', productRouter)
router.use('/type', typeRouter)

module.exports = router