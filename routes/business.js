const route    =    require('express').Router();
const requests =    require('../schema/requestList.js').reqList
const payments =    require('../schema/paymentHistory.js').paymentHistory

route.get('/',(req,res)=>{
    res.render('../public/business/index.hbs');
})

route.post('/newRequest',(req,res)=>{
    console.log("Hello",req.body)
    requests.create(req.body).then(()=>{
        res.send('Success')
    })
})

route.get('/acceptedRequests',(req, res)=>{
    requests.find(
        {promotorUsername: req.user.username},
        {status : "Accepted"}
    ).then((accReqList)=>{
        res.send(accReqList)
    })
})

route.get('/completedRequests',(req, res)=>{
    requests.find(
        {promotorUsername: req.user.username},
        {status : "Completed"}
    ).then((compReqList)=>{
        res.send(compReqList)
    })
})

route.get('/myPayments',(req, res)=>{
    payments.find(
        {promotorUsername: req.user.username},
    ).then((paymentsList)=>{
        res.send(paymentsList)
    })
})

route.post('/makePayment',(req, res)=>{
    payments.insertOne({
        promotorUsername: req.body.promotorUsername,
        creatorUsername: req.user.username,
        requestId: req.body.requestId,
        paymentMode: req.body.paymentMode,
        paymentType: "Promotion",
        amount: req.body.amount,
        timestamp: req.body.timestamp
    }).then((status)=>{
        requests.updateOne(
            {requestId : req.body.requestId},
            {$set: {status : "Paid"}}
        ).then((status)=>{
            res.send("Success")
        })
    })
})

module.exports = {
    route
}