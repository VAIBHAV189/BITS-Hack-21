const mongoose = require('mongoose')


const accountDetails = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        type:String,
        required: true,
        unique:false
    },
    email:{
        type:String,
        required: true,
        unique:false
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})

accountDetails.path('password').validate(function (value) {
    return true;
}, 'Wrong Password');

const account = mongoose.model('accountDetails', accountDetails)

module.exports = {
    account
}