const mongoose = require('mongoose')

const requestStatus = {
    recieved: "Recieved",
    inProgress: "In Progress",
    agreed: "agreed",
    notAgreed: "notAgreed",
    completed: "Completed"
}

const requestList = new mongoose.Schema({
    requestId: {
        type: String,
        required: true,
        unique: true
    },
    requestMetaData: {
        type: String
    },
    promoterUsername:{
        type: String,
        required: true
    },
    creatorUsername: {
        type: String,
        required: true
    },
    offeredOn: {
        type: Date,
        required: true
    },
    promotorUsername: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    amount:{
        type: Number,
        required:true
    },
    status: {
        type: String,
        required: true
    }
})

let reqList = mongoose.model('requestList', requestList)

module.exports = {
    reqList
}