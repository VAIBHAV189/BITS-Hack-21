const mongoose = require('mongoose')

const paymentTypeMap = {
    tips: "tips",
    promotional: "promotion",
    donations: "donations"
}

const paymentHistory = new mongoose.Schema({
    customerUsername: {
        type: String,
        required: true,
        unique: true
    },
    recipientUsername: {
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
    mode: {
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