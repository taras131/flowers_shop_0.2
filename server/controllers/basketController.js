const ApiError = require('../error/ApiError')
const {BasketProduct} = require('../models/models')

class BasketController {
    async add(req, res, next) {
        try {
            const {productId, price} = req.body
            const product = await BasketProduct.findOne({where: {basketId: req.user.id, productId}})
            if (req.user.id){
                if (product) {
                    product.count = product.count + 1
                    await product.save()
                    return res.json(product)
                }
                const newProduct = await BasketProduct.create({basketId: req.user.id, productId, price})
                return res.json(newProduct)
            } else{
                console.log("dont auth")
            }


        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async get(req, res, next) {
        try {
            const basket = await BasketProduct.findAll({where: {basketId: req.user.id}})
            return res.json(basket)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            if(id === "all"){
                await BasketProduct.destroy({where: {basketId: req.user.id}})
                return res.json("success")
            } else {
                const basket = await BasketProduct.destroy({where: {id}})
                return res.json(basket)
            }
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateCount(req, res, next) {
        try {
            const {id, count} = req.body
            const basketItem = await BasketProduct.findOne({where: {id}})
            basketItem.count = count
            await basketItem.save()
            return res.json(basketItem)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new BasketController()