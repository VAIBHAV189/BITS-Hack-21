const express   = require('express');
const server    = express();
const root      = require('./routes/root').route
const session   = require('express-session')
const db        = require('./db')()
const creator   = require('./routes/creator').route
const promotor  = require('./routes/business').route
const mail      = require('./routes/mailService').route

server.use(express.json())
server.use(express.urlencoded({extended:true}))

server.use(session({
    secret : 'whyudodis',
    resave: false,
    saveUninitialized: true,
}));

server.set("view engine","hbs")
server.use(express.static('public'))
// server.use(express.static('public/creator'))

server.use('/root',root)
server.use('/creator',creator)
server.use('/business', promotor)
server.use('/mail',mail)

const PORT = process.env.PORT || 6979
server.listen(PORT,()=>{
    console.log('Server started at http://localhost:'+PORT);
})