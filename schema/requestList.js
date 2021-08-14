const mongoose = require('mongoose')

const requestStatus = {
    recieved: "Recieved",
    inProgress: "In Progress",
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
    creatorUsername: {
        type: String,
        required: true
    },
    offeredOn: {
        type: Date,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    status: {
        type: Map,
        required: true,
        unique: true
    }
})

requestList = mongoose.model('requestList', requestList)

module.exports = {
    requestList,
    requestStatus
}