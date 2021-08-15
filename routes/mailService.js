const route = require('express').Router()
// const user = require('../schema/accountDetails').account
const passport = require('../passport')
const nodemailer = require("nodemailer")

// ------------------------------------------Mail Service------------------------------------------ //
route.use(passport.initialize());
route.use(passport.session());

route.post('/Accept',
    async function(req,res) {
        acceptDescriptionHTML = `
            <h3>Hello This is an acceptance mail</h3>
            <p>
            Your request id ${req.body.id} has been accepted by ${req.body.from.name} .
            The details of your request were as follows : ${req.body.content} .
            Please make a payment of ${req.body.pay}
            </p>
        `
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'contentcreatoreconomy@gmail.com',
                pass: 'vvva@123'
            }
        })
        const mailOptions = {
            from: 'contentcreatoreconomy@gmail.com',
            to: req.body.to.email,
            subject: req.body.from.subject,
            html: acceptDescriptionHTML
        } 
        transporter.sendMail(mailOptions, function(error, info){
            if (error) console.log(error);
            else  console.log('Email sent: ' + info.response);
        })  
        res.send('Success')
})

route.post('/Reject',
    async function(req,res) {
        rejectDescriptionHTML = `
            <h3>Hello This is a rejection mail</h3>
            <p>
            Your request id ${req.body.id} has been rejected by ${req.body.from.name} .
            The details of your request were as follows : ${req.body.content} .
            Better luck next time :)
            </p>
        `
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'contentcreatoreconomy@gmail.com',
                pass: 'vvva@123'
            }
        })
        const mailOptions = {
            from: 'contentcreatoreconomy@gmail.com',
            to: req.body.to.email,
            subject: req.body.from.subject,
            html: rejectDescriptionHTML
        } 
        transporter.sendMail(mailOptions, function(error, info){
            if (error) console.log(error);
            else  console.log('Email sent: ' + info.response);
        })  
        res.send('Success')
})

route.post('/Complete',
    async function(req,res) {
        completeDescriptionHTML = `
            <h3>Hello This is a completion mail</h3>
            <p>
            Your request id ${req.body.id} has been completed by ${req.body.from.name} .
            The details of your request were as follows : ${req.body.content} .
            Thanks for trying Creator Bonanza.
            </p>
        `
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'contentcreatoreconomy@gmail.com',
                pass: 'vvva@123'
            }
        })
        const mailOptions = {
            from: 'contentcreatoreconomy@gmail.com',
            to: req.body.to.email,
            subject: req.body.from.subject,
            html: completeDescriptionHTML
        } 
        transporter.sendMail(mailOptions, function(error, info){
            if (error) console.log(error);
            else  console.log('Email sent: ' + info.response);
        })  
        res.send('Success')
})

module.exports = {
    route
}




// let employeeObj = {}
//             Employee.forEach(function(emp){
//                 if(employeeObj[emp.jobTitle] == undefined) employeeObj[emp.jobTitle] = []
//                 employeeObj[emp.jobTitle].push(emp)
//             })
//             employeeObj = sortObject(employeeObj)
//             let Menu = await menu.findAll({
//                 order: [
//                     ['itemType','ASC']
//                 ] 
//             })
//             let menuObj = {}
//             Menu.forEach(function(item) {
//                 if(menuObj[item.itemType] == undefined) menuObj[item.itemType] = []
//                 menuObj[item.itemType].push(item)
//             })
//             // Menu = sortObject(Menu)
//             let Salary = await salary.findAll({
//                 order: [
//                     ['jobTitle','ASC']
//                 ]
//             })
//             let query = req.query
//             if(Object.keys(query).length == false) {
//                 query = {
//                     team: true,
//                     menu: false,
//                     jobs: false,
//                     customers: false,
//                     orders: false
//                 }
//             }

//             let users = await customers.findAll({})
//             let order = await orders.findAll({})

//             if(typeof(query.team) == 'string') {
//                 console.log('here')
//                 for(let node in query) {
//                     query[node] = (query[node] == 'true')
//                 }
//             }
//             let newObj = {
//                 id: req.user.id,
//                 name: req.user.name,
//                 customers : users,
//                 employee: employeeObj,
//                 menu: menuObj,
//                 orders : order,
//                 salary: Salary,
//                 hideShow: query
//             }

//             res.render('admin',newObj)
//         }
