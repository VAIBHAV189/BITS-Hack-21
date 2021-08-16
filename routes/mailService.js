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
