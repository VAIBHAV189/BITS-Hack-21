const bcrypt = require('bcrypt')
const passport = require('passport')
const strategy = require('passport-local').Strategy
const account=require('./schema/accountDetails').account
console.log(account)

function SessionConstructor(userId, userGroup) {
    this.username = userId
    this.userGroup = userGroup
}

passport.use('local-user-login',new strategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function(username,password,done){
        account.findOne(
            {username:username}
        )
        .then((user)=>{
            if(!user){
                console.log('No such user found in database')
                return done(null,false,{message : 'Incorrect UserName'})
            }
            bcrypt.compare(password, user.password, function(err, result) {
                if(result==true){
                    return done(null,user)
                }else{
                    console.log("Entered Password : " + password)
                    console.log("User Password in Database : " + user.password)
                    console.log('MisMatch!\nTry Again!!')
                    return done(null,false,{message : 'Incorrect Password'})
                }
            })
        })
        .catch(done)
    }
));

passport.serializeUser(function(userObject,done){
    let userGroup
    let userPrototype = Object.getPrototypeOf(userObject)
    let sessionConstructor
    if (userObject.type == "creator") {
        userGroup = "creator";
        sessionConstructor = new SessionConstructor(userObject.username, userGroup)
    } 
    else if (userObject.type == "promoter") {
        userGroup = "promoter";
        sessionConstructor = new SessionConstructor(userObject.username, userGroup)
    }
    done(null,sessionConstructor)
});

passport.deserializeUser(function(sessionConstructor,done){
    if(sessionConstructor.userGroup == 'creator') {
        account.findOne(
            { username: sessionConstructor.username }
        )
        .then((user)=>{
            if(!user) {
                return done(new Error('No Such Creator'));
            }
            return done(null,user)
        })
        .catch((err) =>{
            done(err)
        })
    }
    else if(sessionConstructor.userGroup == 'promoter') {
        account.findOne(
            { username : sessionConstructor.username }
        )
       .then((user)=>{
           if(!user){
                return done(new Error('No Such Promoter'));
            }
            return done(null,user);
       })
       .catch((err)=>{
           done(err)
       })
    }
});

module.exports = passport;






// passport.use('local-employee-login',new strategy({
//     usernameField: 'username',
//     passwordField: 'password'
// },
// function(username,password,done) {
//     account.find(
//         {username : username}
//     )
//     .then((user)=>{
//         if(!user){
//             console.log('No such employee found in database')
//             return done(null,false,{message : 'Incorrect UserName'})
//         }
//         if(user.password != password){
//             console.log("Entered Password : " + password)
//             console.log("Employee Password in Database : " + user.password)
//             console.log('MisMatch!\nTry Again!!')
//             return done(null,false,{message : 'Incorrect Password'})
//         }
//         return done(null,user)
//     })
//     .catch(done)
// } 
// ));          