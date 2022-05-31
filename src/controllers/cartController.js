const cartModel = require('../models/cartModel')
const userModel = require('../models/userModel')
const productModel = require('../models/productModel')

const jwt = require('jsonwebtoken')
const { uploadFile } = require("../utils/aws")
const mongoose = require("mongoose")
const { isValid, isValidObjectType, isValidBody, validString, validMobileNum, validEmail, validPwd, isValidObjectId } = require("../utils/validations")

const createCart = async function (req, res) {
    try {
        let userId = req.params.userId
        let requestBody = req.body
        let productId = req.body.productId

        const isValidUser = await userModel.findById({ _id: userId })
        if (!isValidUser) return res.status(404).send({ status: false, message: "user not found" })

        const product = await productModel.findOne({ _id: productId })
        const productPrice = product.price

        const isAlreadyCart = await cartModel.findOne({ userId: userId })
        if (isAlreadyCart) {
            let alreadyProductsId = isAlreadyCart.items.map(x => x.productId.toString())
            if (alreadyProductsId.includes(productId)) {
                let updatedCart = await cartModel.findOneAndUpdate({ "items.productId": productId, userId: userId }, { $inc: { "items.$.quantity": requestBody.quantity, totalPrice: productPrice * requestBody.quantity } }, { new: true })
                return res.status(200).send({ status: true, message: "updated", data: updatedCart })
            }
            else {
                let updatedCart = await cartModel.findOneAndUpdate({ userId: userId }, { $push: { items: requestBody }, $inc: { totalItems: 1, totalPrice: productPrice * requestBody.quantity } }, { new: true })
                return res.status(200).send({ status: true, message: "updated 2", data: updatedCart })
            }
        }
        const cartCreate = {
            userId: userId,
            items: [requestBody],
            totalItems: 1,
            totalPrice: (requestBody.quantity) * productPrice
        }
        const cartCreated = await cartModel.create(cartCreate)
        return res.status(201).send({ status: true, message: "cart created successfully", data: cartCreated })
    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}


const updateCart = async function (req, res) {
    try {
        const userId = req.params.userId
        const { cartId,productId ,removeProduct }= req.body

        const findCart = await cartModel.findOne({ userId: userId })
        if(!findCart) return res.status(404).send({status: false, messsage: "Cart not found"})
        const findProduct = await productModel.findOne({ _id: productId })
        let reducePrice = findProduct.price

        if (removeProduct == 0) {
            const cart = await cartModel.findOne({ "items.productId": productId, userId: userId })
            const quantity = cart.items.filter(x=>x.productId.toString()===productId)[0].quantity
            const deleteProduct = await cartModel.findOneAndUpdate({ "items.productId": productId , userId: userId}, { $pull: { items: { productId: productId } }, $inc: { totalItems: -1, totalPrice: -reducePrice*quantity } }, { new: true })
            return res.status(200).send({ status: true, messsage: "item removed successfully", data: deleteProduct })
        }
        if (removeProduct == 1) {
            let reduceProduct = await cartModel.findOneAndUpdate({ "items.productId": productId , userId: userId}, { $inc: { "items.$.quantity": -1,  totalPrice: -reducePrice } }, { new: true })
            return res.status(200).send({ status: true, messsage: "product removed successfully", data: reduceProduct })
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}



const getCart = async function (req, res) {
    try {
        const userId = req.params.userId
        if (Object.keys(userId) == 0)  return res.status(400).send({ status: false, message: "userId is required" })
        if (!isValidObjectId(userId))  return res.status(400).send({ status: false, message: "userId is invalid" })
        
    //      let TokenuserId = req.TokenUserId
    //      if (TokenuserId != userId) {
    //    return res.status(400).send({ status: false, message: "you are not authorized" });
    //     }

        const getData = await cartModel.findOne({ userId: userId }).select({ _id: 0 })
        if (!getData)  return res.status(404).send({ status: false, message: "cart not found" })
        
        return res.status(200).send({ status: true, message: "cart details", data: getData })


    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}


const deleteCart = async function (req, res) {
    try {
        const userId = req.params.userId
        if (Object.keys(userId) == 0) {
            return res.status(400).send({ status: false, message: "userId is required" })
        }
        if (!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "userId is invalid" })
        }
        //    let TokenuserId = req.TokenUserId
        //    if (TokenuserId != userId) {
        //     return res.status(400).send({ status: false, message: "you are not authorized" });
        //       }
        const cartData = await cartModel.findOne({ userId: userId })
        if (!cartData) {
            return res.status(404).send({ status: false, message: "cart not found" })
        }
        let cart = { totalItems: 0, totalPrice: 0, items: [] }
        const deleteCart = await cartModel.findOneAndUpdate({ userId: userId }, cart, { new: true })
        return res.status(204).send({ status: true, message: "cart deleted successfully", data: deleteCart })


    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports = {getCart,deleteCart,createCart,updateCart}