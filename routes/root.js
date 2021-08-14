const route = require('express').Router();
const user = require('../schema/accountDetails').account
const passport = require('../passport');

// ------------------------------------------Root Authentication Starts------------------------------------------ //
route.use(passport.initialize());
route.use(passport.session());

route.get('/login',(req,res)=>{
    res.render("login")
})

route.post('/login/user',passport.authenticate('local-user-login',{
        failureRedirect : '/root/login'
    })
    ,function(req,res){
        console.log("Logging In User: ")
        // console.log(req.user)
        return res.redirect('/')
    }
);

route.post('/login/employee',passport.authenticate('local-user-login',{
        failureRedirect : '/root/login'
    })
    ,function(req,res){
        if(req.user.jobTitle === 'Admin') return res.redirect('/admin')
        else return res.redirect('/employee')
});

route.get('/signUp',(req,res)=>{
    res.render("signup")
})

route.post('/signUp',(req,res)=>{
    let obj={
        username:req.body.username,
        password:req.body.password,
        name:req.body.name,
        email:req.body.email,
        type:req.body.type
    }
    user.create(obj)
    .then(()=>{
        res.redirect('/root/login')
    }).catch((err)=>{
        res.send(err)
    })
})

// //----------------------------------------------------Logout Handler-------------------------------------------//

route.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = {
    route
}