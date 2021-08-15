const route    =    require('express').Router();
const requests =    require('../schema/requestList.js').reqList
console.log(requests)

route.get('/',async (req,res)=>{
    // if(req.session.passport.user &&  req.session.passport.user.userGroup!="creator")
    // {
    //     return res.redirect('/root/login')
    // }
    let pendingReqList
    let paidReqList
    let compReqList
    pendingReqList  = await requests.find(
    {
        creatorUsername: "vagi",
        status: "Pending"
    })
    compReqList = await requests.find(
    {
        creatorUsername : "vagi",
        status : "Complete"
    })
    paidReqList = await requests.find(
    {
        creatorUsername : "vv",
        status : "Paid"
    })
    
    res.render('../public/creator/index.hbs',{pendingReqList,compReqList,paidReqList});
})

route.get('/pendingRequests', (req, res)=>{
    requests.find(
    {
        creatorUsername: "vagi",
        status: "Pending"
    }
    ).then((pendingReqList)=>{
        res.render('../public/creator/index.hbs',{pendingReqList})
    })
})

route.get('/paidRequests', (req, res)=>{
    requests.find(
        {
            creatorUsername : "vv",
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
        {
            creatorUsername : req.user.username,
            status : "Completed"
        }
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
        res.redirect('/creator')
    })
})

module.exports = {
    route
}

// Pending -> Accept/Reject ->  Paid -> completed
