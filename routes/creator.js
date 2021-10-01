const route    =    require('express').Router();
const requests =    require('../schema/requestList.js').reqList
const payments =    require('../schema/paymentHistory.js').payHistory
const user     =    require('../schema/accountDetails').account
const fetch    =    require("node-fetch");

route.get('/',async (req,res)=>{
    let pendingReqList
    let paidReqList
    let compReqList
    let paymentsList
    if(req.session.passport != undefined){
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
    }
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

route.post('/updRequestStatus',async (req, res)=>{
    await requests.updateOne(
        {   requestId : req.body.requestId},
        {   $set: {status : req.body.status}}
    )
    let reqDetails = await requests.findOne(
        {requestId : req.body.requestId}
    )
    let receiverDetails = await user.findOne(
        {username : reqDetails.promoterUsername}
    )
    let url_util = "https://creator-bonanza.herokuapp.com/mail/"
    let url = url_util.concat(req.body.status);
    let data = {
        from : {
            name : reqDetails.creatorUsername,
            subject : reqDetails.status + "ed request of id " + reqDetails.requestId 
        },
        to : {
            name : reqDetails.promoterUsername,
            email : receiverDetails.email
        },
        id : reqDetails.requestId,
        content : reqDetails.requestMetaData,
        pay : reqDetails.amount
    }
    
    let response = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body   : JSON.stringify(data)
    })
    res.redirect('/creator')
})

module.exports = {
    route
}

