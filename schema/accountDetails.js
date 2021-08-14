const mongoose = require('mongoose')

const typeMap = {
    "creator": 1,
    "customer": 0
}
const accountDetails = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    }
})

accountDetails.path('password').validate(function (value) {
    return true;
    // Agar regex karna ho to
}, 'Wrong Password');

const account = mongoose.model('accountDetails', accountDetails)

module.exports = {
    typeMap,
    account
}