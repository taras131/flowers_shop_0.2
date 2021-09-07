const uuid = require('uuid')
const path = require('path')
const {Product} = require('../models/models')
const ApiError = require('../error/ApiError')
const fs = require('fs');

class ProductController {
    async create(req, res, next) {
        try {
            const {name, price, typeId, description,isAvailability} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, "..", "static", fileName))
            const product = await Product.create({name, price, typeId, description, img: fileName,isAvailability})
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async get(req, res) {
        let {typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 16
        let offset = limit * page - limit
        let isAvailability = true
        let products
        if (typeId) {
            products = await Product.findAndCountAll({where: {typeId, isAvailability}, limit, offset})
        } else {
            products = await Product.findAndCountAll({limit, offset})
        }
        return res.json(products)
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne({where: {id}})
        return res.json(product)
    }

    async getAll(req, res, next) {
        try {
            const products = await Product.findAll()
            return res.json(products)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async update(req, res, next) {
        try {
            const {id, name, price, typeId, description,isAvailability} = req.body
            const product = await Product.findOne({where:{id}})
            product.name = name
            product.price = price
            product.typeId = typeId
            product.description = description
            product.isAvailability = isAvailability
            const data = await product.save();
            return res.json(data)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res, next){
        try {
            const {id} = req.params
            const product = await Product.findOne({where: {id}})
            fs.unlinkSync(path.resolve(__dirname, "..", "static", product.img));
            const data = await Product.destroy({where:{id}})
            return res.json(data)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ProductController()