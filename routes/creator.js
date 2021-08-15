const route    =    require('express').Router();
const requests =    require('../schema/requestList.js').reqList
console.log(requests)

route.get('/',(req,res)=>{
    res.render('../public/creator/index.hbs');
})

route.get('/pendingRequests', (req, res)=>{
    // console.log(req.userObject)
    requests.find(
        {
            creatorUsername: "vagi",
            status: "Pending"
        }
    ).then((pendingReqList)=>{
        // console.log(pendingReqList)
        res.render('../public/creator/index.hbs',{pendingReqList})
    })
})

route.get('/paidRequests', (req, res)=>{
    requests.find(
        {
            creatorUsername : "vagi",
            status : "Paid"
        }
    ).then((paidReqList)=>{
        console.log(paidReqList)
        res.render('../public/creator/index.hbs',{paidReqList})
    })
})

route.get('/myPayments',(req, res)=>{
    payments.find(
        {creatorUsername: "vagi"},
    ).then((paymentsList)=>{
        res.render('../public/creator/index.hbs',{paymentsList})
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
    console.log("Ye dekho sab",req.body)
    requests.updateOne(
        {
            requestId : req.body.requestId,
            $set: {status : req.body.status}
        }
    ).then((obj)=>{
        // console.log(obj)
        res.send("Pika chha gaya")
    })
})

module.exports = {
    route
}

// Pending -> Accept/Reject ->  Paid -> completed
