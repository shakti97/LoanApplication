const express=require('express');
const router=express.Router();
const UserOperation=require('../database/UserOperations.js');
const passport=require('passport');
// const passportFacebook=require('passport-Facebook');
const config=require('../utils/config/auth.js');
var FacebookStrategy = require('passport-facebook').Strategy;
const sessionChecker=require('../utils/sessionHandling/sessionChecker.js');
const userSchema=require('../database/schema/UserSchema.js');


passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});
passport.use(new FacebookStrategy({
        clientID: config.facebookAuth.clientID,
        clientSecret: config.facebookAuth.clientSecret,
        callbackURL: config.facebookAuth.callbackURL
      },
      function(accessToken, refreshToken, profile, cb) {
            console.log('AccessToken ',accessToken + " profile ",profile , " cb ",cb);
            userSchema.find({ email: profile.id }, function (err, user) {
                if(err){
                    console.log('error in fb id finding ',err);
                }
                else if(user && user.length==0){
                    userSchema.create({name :profile.displayName,email : profile.id  },(err,userdoc)=>{
                        if(err){
                            console.log('error in creating the fb id ',err)
                        }
                        else{
                            console.log("successfully create the user ",userdoc._id);
                        }
                    })
                }
                else if(user && user.length>0){
                    console.log(' find the id exist ',user[0]._id);
                }
                return cb(err, user);
        });
      }
    ));


router.post('/signUp',(req,res)=>{
    console.log('signUp');
    userObject=req.body.userDetails;
    UserOperation
});
router.post('/login',(req,res)=>{
    console.log('login');
});
router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    console.log("Successful authentication, redirect home.");
    res.redirect('/');
  });
router.get('/home',(req,res)=>{
    console.log('its home component ');
})
router.post('/requestLoan',sessionChecker,(req,res)=>{
    console.log('requestLoan');
})
router.post('/approveLoan',sessionChecker,(req,res)=>{
    console.log('approveLoan');
})
router.post('/rejectLoan',sessionChecker,(req,res)=>{
    console.log('rejectLoan');
})
router.get('/getLoan',sessionChecker,(req,res)=>{
    console.log('getLoan');
})

module.exports=router;