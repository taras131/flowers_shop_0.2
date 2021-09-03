const ApiError = require('../error/ApiError')
const {Order, OrderProduct} = require('../models/models')

class OrderController {
    async create(req, res, next) {
        let {delivery, address, totalSum, totalCount, phone, basket, comment} = req.body
        const order = await Order.create({delivery, address, totalSum, totalCount, phone, userId: req.user.id,comment})
        if (basket) {
            basket = JSON.parse(basket)
            basket.forEach(item =>
                OrderProduct.create({
                    productId: item.productId,
                    price: item.price,
                    count: item.count,
                    orderId: order.id
                })
            )
        }
        return res.json(order)
    }

    async get(req, res, next) {
        const orders = await Order.findAll({where: {userId: req.user.id}})
        return res.json(orders)
    }

    async getAll(req, res, next) {
        const {status} = req.params
        let orders
        if(status === "Все"){
            orders = await Order.findAll()
        } else {
            orders = await Order.findAll({where: {status}})
        }
        return res.json(orders)
    }
    async delete(req,res,next) {
        try{
            const {id} = req.params
            await Order.destroy({where:{userId: req.user.id, id: id}})
            await OrderProduct.destroy({where:{orderId: id}})
            return res.json("success")
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getOne(req, res) {
        const {id} = req.params
        const device = await Order.findOne(
            {
                where: {id},
                include: [{model: OrderProduct, as: 'products'}]
            },
        )
        return res.json(device)
    }
    async updateStatus(req, res) {
        const {id, status} = req.body
        console.log(status)
        const order = await Order.findOne({where: {id}})
        order.status = status
        const data = await order.save()
        return res.json(data)
    }
}

module.exports = new OrderController()