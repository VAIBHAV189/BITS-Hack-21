const route    =    require('express').Router();
const requests =    require('../schema/requestList.js').reqList
const payments =    require('../schema/paymentHistory.js').payHistory

route.get('/',async (req,res)=>{
    let accReqList
    let compReqList
    let paymentsList
    accReqList = await requests.find(
    {
        promoterUsername: "vv",
        status : "Accept"
    })
    compReqList = await requests.find(
    {
        promoterUsername: "vv",
        status : "Complete"
    })
    paymentsList = await payments.find(
    {
        promoterUsername: "vv"
    })
    res.render('../public/business/index.hbs',{accReqList, compReqList, paymentsList});
})

route.post('/newRequest',(req,res)=>{
    requests.create(req.body).then(()=>{
        res.send('Success')
    })
})

route.get('/acceptedRequests',(req, res)=>{
    requests.find(
        {promoterUsername: "vv"},
        {status : "Accept"}
    ).then((accReqList)=>{
        res.send(accReqList)
    })
})

route.get('/completedRequests',(req, res)=>{
    requests.find(
        {promoterUsername: "vv",
        status : "Completed"}
    ).then((compReqList)=>{
        res.send(compReqList)
    })
})

route.get('/myPayments',(req, res)=>{
    payments.find(
        {promoterUsername: "vv"},
    ).then((paymentsList)=>{
        res.send(paymentsList)
    })
})

route.post('/makePayment',(req, res)=>{
    console.log(req.body)
    payments.create({
        paymentId: req.body.paymentId,
        promoterUsername: "vv",
        creatorUsername: req.body.creatorUsername,
        requestId: req.body.requestId,
        paymentMode: req.body.paymentMode,
        paymentType: "Promotion",
        amount: req.body.amount,
        timestamp: req.body.timestamp
    }).then((status)=>{
        requests.updateOne(
            {requestId : req.body.requestId},
            {$set: {status : req.body.status}}
        ).then((status)=>{
            res.send("Success")
        })
    })
    // res.send('Success')
})

module.exports = {
    route
}