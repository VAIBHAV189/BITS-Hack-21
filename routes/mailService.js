const route = require('express').Router()
// const user = require('../schema/accountDetails').account
const passport = require('../passport')
const nodemailer = require("nodemailer")

// ------------------------------------------Mail Service------------------------------------------ //
route.use(passport.initialize());
route.use(passport.session());

route.get('/rejectionMail',
    async function(req,res){
        console.log('This is req.user->', req.user)
        if(req.user) {
            console.log(req.body)
            rejectedDescriptionHTML = `
             <h1> Hello This is the rejection mail! </h1>
            `
            const mail = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'your-email@gmail.com',
                  pass: 'your-gmail-password'
                }
            })
            const mailOptions = {
                from: 'youremail@gmail.com',
                to: 'myfriend@gmail.com',
                subject: 'Sending Email via Node.js',
                html: rejectedDescriptionHTML
            } 
            transporter.sendMail(mailOptions, function(error, info){
                if (error) console.log(error);
                else  console.log('Email sent: ' + info.response);
            })  
        }
        else res.redirect('/logout')
        res.status(200).status('Rejection sent Succesfully!!')
})

route.get('/acceptanceMail',
    async function(req,res) {
        console.log('This is req.user->', req.user)
        if(req.user) {
            console.log(req.body)
            acceptDescriptionHTML = `
             <h1> Hello This is the acceptance mail! </h1>
            `
            const mail = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'your-email@gmail.com',
                  pass: 'your-gmail-password'
                }
            })
            const mailOptions = {
                from: 'youremail@gmail.com',
                to: 'myfriend@gmail.com',
                subject: 'Sending Email via Node.js',
                html: acceptDescriptionHTML
            } 
            transporter.sendMail(mailOptions, function(error, info){
                if (error) console.log(error);
                else  console.log('Email sent: ' + info.response);
            })  
        }
        else res.redirect('/logout')
        res.status(200).status('Acceptance sent Succesfully!!')
})

route.get('/completionMail',
    async function(req,res){
        console.log('This is req.user->', req.user)
        if(req.user) {
            console.log(req.body)
            taskCompleteDescriptionHTML = `
             <h1> Hello This is the rejection mail! </h1>
            `
            const mail = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'your-email@gmail.com',
                  pass: 'your-gmail-password'
                }
            })
            const mailOptions = {
                from: 'youremail@gmail.com',
                to: 'myfriend@gmail.com',
                subject: 'Sending Email via Node.js',
                html: taskCompleteDescriptionHTML
            } 
            transporter.sendMail(mailOptions, function(error, info){
                if (error) console.log(error);
                else  console.log('Email sent: ' + info.response);
            })  
        }
        else res.redirect('/logout')
        res.status(200).status('Rejection sent Succesfully!!')
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
