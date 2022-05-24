const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    fname: {
       type: string,
       trim:true,
       required:true 
    },
  lname: {
      type:string,
      trim:true,
      required:true 
    },
  email: {
      type:string, 
      required:true,
      trim:true,
        unique:true
    },
  profileImage: {
      type:string, 
      required:true 
    }, // s3 link
  phone: {
      type:string, 
      required:true, 
      trim:true,
      unique:true
      
    }, 
  password: {
      type:string,
      required:true ,
      trim:true,
      min:8,
      max:15}, // encrypted password
  address: {
    shipping: {
      street: {type:string, required:true },
      city: {type:string, required:true },
      pincode: {type:number, required:true }
    },
    billing: {
      street: {type:string, required:true },
      city: {tpye:string, required:true },
      pincode: {type:number, required:true }
    }
  }
},{timestamps:true})

module.exports = mongoose.model('User',userSchema)  //users