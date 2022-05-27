const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  fname: { type: String, trim: true, required: true },
  lname: { type: String, trim: true, required: true },
  email: { type: String, required: true, trim: true, unique: true, lowercase: true },
  profileImage: { type: String, required: true }, // s3 link
  phone: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true, min: 8, max: 15 }, // encrypted password
  address: {
    shipping: {
      street: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      pincode: { type: String, required: true, trim: true }
    },
    billing: {
      street: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      pincode: { type: String, required: true, trim: true }
    }
  }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)  //users