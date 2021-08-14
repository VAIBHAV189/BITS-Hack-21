const route    =    require('express').Router;
const requests =    require('./schema/requestList.js').requestList

route.get('/pendingRequests', (req, res)=>{
    requests.find(
        {creatorUsername: req.user.username},
        {status: "Pending"}
    ).then((pendingReqList)=>{
        res.send(pendingReqList)
    })
})

route.get('/paidRequests', (req, res)=>{
    request.find(
        {creatorUsername : req.user.username},
        {status : "Paid"}
    ).then((paidReqList)=>{
        res.send(paidReqList)
    })
})

route.get('/completedRequests', (req, res)=>{
    request.find(
        {creatorUsername : req.user.username},
        {status : "Completed"}
    ).then((compReqList)=>{
        res.send(compReqList)
    })
})

route.post('/updRequestStatus', (req, res)=>{
    requests.updateOne(
        {requestId : req.body.requestId},
        {$set: {status : req.body.status}}
    )
})

module.exports = {
    route
}

// Pending -> Accept/Reject ->  Paid -> completed
