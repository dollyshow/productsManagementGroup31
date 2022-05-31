const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

 userId:{type:mongoose.Schema.Types.ObjectId,  ref:'user',required:true , unique:true},
 items: [{
           productId: {type:mongoose.Schema.Types.ObjectId,  ref:'productModel', required:true},
           quantity: {type:Number, required:true, min: 1, trim: true}
    }],
totalPrice:{type:Number,required:true, trim: true},
totalItems:{type:Number, required:true, trim: true}
   

},{timestamps:true})

module.exports = mongoose.model('Cart',userSchema)  //carts