const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})
const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const BasketProduct = sequelize.define('basket-product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    count: {type: DataTypes.INTEGER, defaultValue: 1},
    price: {type: DataTypes.INTEGER, allowNull: false}
})
const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    isAvailability: {type: DataTypes.BOOLEAN, defaultValue: true},
    img: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING}
})
const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})
const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.STRING, defaultValue: "Cоздан"},
    delivery: {type: DataTypes.STRING},
    address: {type: DataTypes.STRING},
    totalSum: {type: DataTypes.INTEGER},
    totalCount: {type: DataTypes.INTEGER},
    phone: {type: DataTypes.STRING},
    comment: {type: DataTypes.STRING}
})
const OrderProduct = sequelize.define('order-product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    count: {type: DataTypes.INTEGER, defaultValue: 1},
    price: {type: DataTypes.INTEGER, allowNull: false}
})
const Setting = sequelize.define('setting', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    phone: {type: DataTypes.STRING},
    location: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    shopName: {type: DataTypes.STRING}
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasOne(Order)
Order.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

Order.hasMany(OrderProduct, {as: 'products'})
OrderProduct.belongsTo(Order)

Type.hasMany(Product)
Product.belongsTo(Type)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

Product.hasMany(OrderProduct)
OrderProduct.belongsTo(Product)

module.exports = {
    User, Basket, BasketProduct, Type, Product, Order, OrderProduct, Setting
}