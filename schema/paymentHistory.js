const mongoose = require('mongoose')

const paymentTypeMap = {
    tips: "tips",
    promotional: "promotion",
    donations: "donations"
}

const paymentHistory = new mongoose.Schema({
    promotorUsername: {
        type: String,
        required: true,
        unique: true
    },
    creatorUsername: {
        type: String,
        required: true,
        unique: true
    },
    requestId: {
        type: String,
        required: true,
        unique: true
    },
    paymentId: {
        type: String,
        required: true,
        unique: true
    },
    paymentType: {
        type: String,
        required: true,
        unique: true
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

paymentHistory = mongoose.model('paymentHistory', paymentHistory)

module.exports = {
    paymentHistory,
    paymentTypeMap
}