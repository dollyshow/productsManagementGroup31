const express = require('express');
const router = express.Router();

//FEATURE I
const {register,userLogin,getProfile,updateUserDetails} = require("../controllers/UserController")

router.post("/register", register)
router.post('/Login', userLogin)
router.get('/user/:userId/profile', getProfile)
router.put('/user/:userId/profile', updateUserDetails)


//FEATURE II
const { Productregister,getByfilter, getProductById, deleteProductById, updateProductDetals } = require("../controllers/productController")

router.post('/products',Productregister)
router.get('/products', getByfilter)
router.get('/products/:productId',getProductById)
router.put('/products/:productId', updateProductDetals)
router.delete('/products/:productId', deleteProductById)

//FEATURE III
const  {getCart,deleteCart,createCart,updateCart}=  require("../controllers/cartController")

router.post('/users/:userId/cart', createCart)
router.put('/users/:userId/cart', updateCart)
router.get('/users/:userId/cart', getCart)
router.delete('/users/:userId/cart', deleteCart)

//FEATURE IV
const {createOrder,updateOrder}= require("../controllers/orderController")

router.post('/users/:userId/orders', createOrder)
router.put('/users/:userId/orders', updateOrder)


//if api is invalid OR wrong URL
router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
})

module.exports = router;