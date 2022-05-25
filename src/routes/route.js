const express = require('express');
const router = express.Router();
const UserController = require("../controllers/UserController")
// const  = require("../controllers/userController")

//url api

router.post("/register", UserController.register)
router.post('/Login', UserController.userLogin)
router.get('/user/:userId/profile', UserController.getProfile)
router.put('/user/:userId/profile', UserController.updateUserDetails)

//if api is invalid OR wrong URL
router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
})

module.exports = router;