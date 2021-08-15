const route    =    require('express').Router();
const requests =    require('../schema/requestList.js').reqList
const payments =    require('../schema/paymentHistory.js').payHistory

route.get('/',async (req,res)=>{
    let pendingReqList
    let paidReqList
    let compReqList
    let paymentsList
    pendingReqList  = await requests.find(
    {
        creatorUsername: req.session.passport.user.username,
        status: "Pending"
    })
    compReqList = await requests.find(
    {
        creatorUsername : req.session.passport.user.username,
        status : "Complete"
    })
    paidReqList = await requests.find(
    {
        creatorUsername : req.session.passport.user.username,
        status : "Paid"
    })
    paymentsList = await payments.find(
    {
        creatorUsername: req.session.passport.user.username
    })
    res.render('../public/creator/index.hbs',{pendingReqList, compReqList, paidReqList, paymentsList});
})

route.get('/pendingRequests', (req, res)=>{
    requests.find(
    {
        creatorUsername: req.session.passport.user.username,
        status: "Pending"
    }
    ).then((pendingReqList)=>{
        res.render('../public/creator/index.hbs',{pendingReqList})
    })
})

route.get('/paidRequests', (req, res)=>{
    requests.find(
        {
            creatorUsername : req.session.passport.user.username,
            status : "Paid"
        }
    ).then((paidReqList)=>{
        console.log(paidReqList)
        res.render('../public/creator/index.hbs',{paidReqList})
    })
})

route.get('/myPayments',(req, res)=>{
    payments.find(
        {creatorUsername: req.session.passport.user.username},
    ).then((paymentsList)=>{
        res.render('../public/creator/index.hbs',{paymentsList})
    })
})

route.get('/completedRequests', (req, res)=>{
    request.find(
        {
            creatorUsername : req.session.passport.user.username,
            status : "Completed"
        }
    ).then((compReqList)=>{
        res.send(compReqList)
    })
})

route.post('/updRequestStatus', (req, res)=>{
    requests.updateOne(
        {   requestId : req.body.requestId},
        {   $set: {status : req.body.status}}
    ).then((obj)=>{
        res.redirect('/creator')
    })
})

module.exports = {
    route
}

// Pending -> Accept/Reject ->  Paid -> completed
