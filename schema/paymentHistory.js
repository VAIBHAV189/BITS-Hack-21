const mongoose = require('mongoose')



const paymentHistory = new mongoose.Schema({
    paymentId: {
        type: String,
        required: true,
        unique: true
    },
    requestId: {
        type: String,
        required: true,
        unique: true
    },
    promotorUsername: {
        type: String,
        required: true,
    },
    creatorUsername: {
        type: String,
        required: true,
    },
    paymentType: {
        type: String,
        required: true,
    },
    paymentMode: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    }
})


payHistory = mongoose.model('paymentHistory', paymentHistory)

module.exports = {
    payHistory
}