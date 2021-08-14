const passport = require('passport')
const strategy = require('passport-local').Strategy
const account=require('./schema/accountDetails')
console.log(account)

function SessionConstructor(userId, userGroup) {
    this.userId = userId;
    this.userGroup = userGroup;
}


passport.use('local-user-login',new strategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function(username,password,done){
        account.find(
            {username:username}
        )
        .then((user)=>{
            if(!user){
                console.log('No such user found in database')
                return done(null,false,{message : 'Incorrect UserName'})
            }
            if(user.password != password){
                console.log("Entered Password : " + password)
                console.log("User Password in Database : " + user.password)
                console.log('MisMatch!\nTry Again!!')
                return done(null,false,{message : 'Incorrect Password'})
            }
            return done(null,user)
        })
        .catch(done)
    }
));


passport.use('local-employee-login',new strategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function(username,password,done) {
        account.find(
            {username : username}
        )
        .then((user)=>{
            if(!user){
                console.log('No such employee found in database')
                return done(null,false,{message : 'Incorrect UserName'})
            }
            if(user.password != password){
                console.log("Entered Password : " + password)
                console.log("Employee Password in Database : " + user.password)
                console.log('MisMatch!\nTry Again!!')
                return done(null,false,{message : 'Incorrect Password'})
            }
            return done(null,user)
        })
        .catch(done)
    } 
));            


passport.serializeUser(function(userObject,done){
    let userGroup
    let userPrototype = Object.getPrototypeOf(userObject)
    let sessionConstructor
    if (userPrototype === user.prototype) {
        userGroup = "user";
        sessionConstructor = new SessionConstructor(userObject.username, userGroup)
    } 
    else if (userPrototype === employeeTable.prototype) {
        userGroup = "employee";
        sessionConstructor = new SessionConstructor(userObject.id, userGroup)
    }
    done(null,sessionConstructor)
});

passport.deserializeUser(function(sessionConstructor,done){
    if(sessionConstructor.userGroup == 'user') {
        user.findOne({
            where : {
                username: sessionConstructor.userId
            }
        })
        .then((user)=>{
            if(!user) {
                return done(new Error('No Such User'));
            }
            return done(null,user)
        })
        .catch((err) =>{
            done(err)
        })
    }
    else if(sessionConstructor.userGroup == 'employee') {
        employeeTable.findOne({
            where : { 
                id : sessionConstructor.userId
            }
        })
       .then((user)=>{
           if(!user){
                return done(new Error('No Such Employee'));
           }
          return done(null,user);
       })
       .catch((err)=>{
           done(err)
       })
    }
});

module.exports = passport;