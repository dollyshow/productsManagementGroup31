const productModel = require('../models/productModel')
const  {uploadFile} =require("../utils/aws")



const  { isValid, isValidObjectType, isValidBody,  validString, validMobileNum,validInstallments,validPriceNum,validCurrencyFormat, validEmail, validPwd, isValidObjectId } = require("../utils/validations")

const Productregister = async (req, res) => {
    try {
        const data = req.body

        //check for empty body
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "please enter some DETAILS!!!" })
        }

        //check for title  ------------------------------------------------
        if (!data.title) {
            return res.status(400).send({ status: false, message: "title is required!!!" })
        }
        if (validString(data.title)) {
            return res.status(400).send({ status: false, message: "title is INVALID!!!" })
        }

        //check for description---------------------------------------------------------------------------------
        if (!data.description) {
            return res.status(400).send({ status: false, message: "description is required!!!" })
        }
        if (validString(data.description)) {
            return res.status(400).send({ status: false, message: "description  is INVALID!!!" })
        }

        //price no---------------------------------------------------------------------------------------------

        if (!data.price) {
            return res.status(400).send({ status: false, message: "price is missing" })
        }
        if (validPriceNum(data.price)) {
            return res.status(400).send({ status: false, message: "price is INVALID" })
        }
     
        //currencyId--------------------------------------------------------------------------------------------------
        if (!data.currencyId){
            return res.status(400).send({ status: false, message: "currencyId is missing" })
        }

        //currencyFormat----------------------------------------------------------------------------------------------
        if (!data.currencyFormat){
            return res.status(400).send({ status: false, message: "currencyFormat is missing" })
        }
        if (validCurrencyFormat(data.currencyFormat)){
            return res.status(400).send({ status:false,message: "currencyFormat should show the indian ruppee symbol" })
        }
        //productImage---------------------------------------------------------------------------------------------------
        let files = req.files
        if (files && files.length > 0) {
            //upload to s3 and get the uploaded link
            console.log("hello")
            // res.send the link back to frontend/postman
            let uploadedFileURL = await uploadFile(files[0])
            data.productImage = uploadedFileURL
           
        } else {
             return res.status(400).send({message:"product cover image not given"})
        }
        //style----------------------------------------------------------------------------------------------------------
        if(!data.style){
            return res.status(400).send({status:false,message:"style is missing"})
        }
        if (validString(data.style)) {
            return res.status(400).send({ status: false, message: "style is INVALID!!!" })
        }
        //availableSizes--------------------------------------------------------------------------------------------------
        if(!data.availableSizes){
            return res.status(400).send({status:false,message:"availableSizes is missing"})
        }
        if ([ "S", "XS","M","X", "L","XXL", "XL"] .indexOf(data.availableSizes) == -1) {
            return res.status(400).send({ status: false, message: "Enter a valid availableSizes (e.g- S or XS or M or X or L or XXL or XL) " });
        }

        //installments
        if(!data.installments){
            return res.status(400).send({status:false,message:"installments is missing"})
        }
        if(validInstallments(data.installments)){
            return res.status(400).send({status:false,message:"installments is Invalid!!!"})
        }

         // //create product--------------------------------------------------------------------------------------------------
         const product = await productModel.create(data)
         return res.status(201).send({ status: true, message: "success", data: product })
 


}
catch (error) {
    res.status(500).send({status:false, message:error.message});
}
}




const getProductById = async (req, res) => {
    try {
        // const query = req.query

        // if (Object.keys(query) != 0) {
        //     return res.status(400).send({ status: false, message: "Invalid params present in URL" })
        // }

        const productId = req.params.productId

        if (!isValidObjectId(productId)) {
            return res.status(400).send({ status: false, message: `${productId} is not valid type Product Id` });
        }

        const findProduct = await productModel.findOne({ _id: productId, isDeleted: false })
        if (!findProduct) {
            return res.status(404).send({ status: false, message: 'Product does not exists or has been deleted' })  //Validate: The Product Id is valid or not.
        }
        return res.status(200).send({ status: true, message: 'Product found successfully', data: findProduct })
    }
    catch (error) {
        res.status(500).send({status:false, message:error.message});
    }
}


       

        const deleteProductById = async function (req, res) {
            try {
                let productId = req.params.productId;
                let result = await productModel.findOne({
                    _id: productId,
                    isDeleted: false
                });
                if (!result) return res.status(404).send({
                    status: false,
                    msg: "User data not found"
                })
                let updated = await productModel.findByIdAndUpdate({
                    _id: productId,
                    isDeleted: false
                }, {
                    isDeleted: true,
                    deletedAt: Date()
                }, {
                    new: true
                });
                res.status(200).send({
                    status: true,
                    data: "Deletion Successfull"
                });
            } catch (error) {
                res.status(500).send({
                    status: false,
                    msg: error.message
                });
            }
        };



module.exports = {Productregister,getProductById ,deleteProductById}