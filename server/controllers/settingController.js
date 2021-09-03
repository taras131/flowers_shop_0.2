const ApiError = require('../error/ApiError')
const {Setting} = require('../models/models')

class SettingController {
    async set(req, res, next) {
        try {
            const {phone, location, email, shopName} = req.body
            const id =1
            const setting = await Setting.findOne({where:{id}})
            let data
            if(setting){
                setting.phone = phone
                setting.location = location
                setting.email = email
                setting.shopName = shopName
                data = await setting.save()
            } else {
                data = await Setting.create({phone, location, email, shopName})
            }
            return res.json(data)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async get(req,res,next){
        try {
            const id =1
            const settings = await Setting.findOne({where: {id}})
            return res.json(settings)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new SettingController()
