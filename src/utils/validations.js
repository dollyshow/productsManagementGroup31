const mongoose = require("mongoose")

const isValidSize = (Size) => {
  let correctSize = ["S", "XS", "M", "X", "L", "XXL", "XL"]
  return (correctSize.includes(Size))
}


const isValid = function (value) {
  if (typeof value === 'undefined' || value === null) return false
  if (typeof value === 'string' && value.trim().length === 0) return false
  return true;  
}

const isValidObjectType = (value) => {
  if (typeof value === 'object' && Object.keys(value).length > 0) {
    return false;
  } else {
    return true;
  }
}

const  isValidBody = (object) => {
  if (Object.keys(object).length > 0) {
    return true
  } else {
    return false;
  }
};



const validString = (String) => {     //ab5cd   true
  if (/\d/.test(String)) {
    return true
  } else {
    return false;
  };
};

const validMobileNum = (Mobile) => {     ///6876dgdfgd348756  true
  if (/^[6-9]\d{9}$/.test(Mobile)) {
    return false
  } else {
    return true;
  };
};
const validPriceNum=(price)=>{
  if(/^\d{0,8}[.]?\d{1,4}$/.test(price)){
    return false
  }else{
    return true;
  }
}
const validInstallments=(installments)=>{
  if(/^\d{0,1}$/.test(installments)){
    return false
  }else{
    return true;
  }
}
const validCurrencyFormat=(currencyFormat)=>{
  if(/^\d|₹|$/.test(currencyFormat)){
    return false
  }else{
    return true
  }

}
const validEmail = (Email) => {
  if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(Email)) {
    return false
  } else {
    return true;
  }

};

const isValidNum = (number) => {
  if (/^\d+$/.test(number)) {
    return true
  } else {
    return false;
  };
};

const validPwd = (Password) => {
  if (/^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,15}$/.test(Password)) {
    return false
  } else {
    return true;
  }
};

const isValidObjectId = (objectId) => {
  return mongoose.Types.ObjectId.isValid(objectId)
};

const isValidStatus = (status) => {
  let correctStatus = ['pending', 'completed', 'cancled']
  return (correctStatus.includes(status))
}

module.exports = { isValid,isValidNum,isValidStatus, isValidObjectType, isValidBody,  validString, validMobileNum,validPriceNum,validInstallments,validCurrencyFormat, validEmail, validPwd, isValidObjectId ,isValidSize};

