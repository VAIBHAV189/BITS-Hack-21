const route    =    require('express').Router();
const requests =    require('../schema/requestList.js').reqList
const payments =    require('../schema/paymentHistory.js').payHistory

route.get('/',async (req,res)=>{
    let accReqList
    let compReqList
    let paymentsList
    if(req.session.passport != undefined){
        accReqList = await requests.find(
        {
            promoterUsername: req.session.passport.user.username,
            status : "Accept"
        })
        compReqList = await requests.find(
        {
            promoterUsername: req.session.passport.user.username,
            status : "Complete"
        })
        paymentsList = await payments.find(
        {
            promoterUsername: req.session.passport.user.username
        })
    }
    res.render('../public/business/index.hbs',{accReqList, compReqList, paymentsList});
})

route.post('/newRequest',(req,res)=>{
    requests.count({}, function( err, count){
        count += 1;
        requests.create({
            requestId : count.toString(),
            requestMetaData : req.body.requestMetaData,
            promoterUsername : req.session.passport.user.username,
            creatorUsername : req.body.creatorUsername,
            offeredOn : req.body.offeredOn,
            deadline : req.body.deadline,
            amount : req.body.amount,
            status : "Pending"
        }).then(()=>{
            res.redirect('/business')
        })
    })
})

route.get('/acceptedRequests',(req, res)=>{
    requests.find(
        {promoterUsername: req.session.passport.user.username},
        {status : "Accept"}
    ).then((accReqList)=>{
        res.send(accReqList)
    })
})

route.get('/completedRequests',(req, res)=>{
    requests.find(
        {promoterUsername: req.session.passport.user.username,
        status : "Complete"}
    ).then((compReqList)=>{
        res.send(compReqList)
    })
})

route.get('/myPayments',(req, res)=>{
    payments.find(
        {promoterUsername: req.session.passport.user.username},
    ).then((paymentsList)=>{
        res.send(paymentsList)
    })
})

route.post('/makePayment',(req, res)=>{
    console.log(req.body)
    payments.count({}, function( err, count){
        count += 1
        payments.create({
            paymentId: count.toString(),
            promoterUsername: req.session.passport.user.username,
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
                res.redirect('/business')
            })
        })
    })
})

module.exports = {
    route
}