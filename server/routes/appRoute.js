const express = require('express');
const router = express.Router();
const UserOperation = require('../database/UserOperations.js');
const passport = require('passport');
// const passportFacebook=require('passport-Facebook');
const config = require('../utils/config/auth.js');
var FacebookStrategy = require('passport-facebook').Strategy;
const sessionChecker = require('../utils/sessionHandling/sessionChecker.js');
const userSchema = require('../database/schema/UserSchema.js');

var id = '';
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
passport.use(new FacebookStrategy({
        clientID: config.facebookAuth.clientID,
        clientSecret: config.facebookAuth.clientSecret,
        callbackURL: config.facebookAuth.callbackURL
    },
    function (accessToken, refreshToken, profile, cb) {
        console.log('AccessToken ', accessToken + " profile ", profile, " cb ", cb);
        userSchema.find({
            email: profile.id
        }, function (err, user) {
            if (err) {
                console.log('error in fb id finding ', err);
            } else if (user && user.length == 0) {
                userSchema.create({
                    name: profile.displayName,
                    email: profile.id
                }, (err, userdoc) => {
                    if (err) {
                        console.log('error in creating the fb id ', err)
                    } else {
                        console.log("successfully create the user ", userdoc._id);
                    }
                })
            } else if (user && user.length > 0) {
                console.log(' find the id exist ', user[0]._id);
            }
            return cb(err, user);
        });
    }
));


router.post('/signUp', (req, res) => {
    console.log('signUp app route');
    let userObject = req.body;
    console.log('request header ', req.headers);
    console.log('userObject ', userObject);
    UserOperation.UserSignUp(userObject, res);
});
router.post('/addRole', (req, res) => {
    console.log('addRole Route');
    let userObject = req.body;
    console.log('request headers ', req.headers);
    UserOperation.addRole(userObject, res);
})
router.post('/login', (req, res) => {
    console.log('login');
    let userObject = req.body;
    console.log('request headers ', req.headers);
    UserOperation.UserLogIn(userObject, req, res);
});
router.get('/auth/facebook',
    passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        console.log('req',req);
        console.log('req ',req.user[0]._id);
        console.log("sessionid ", req.sessionID);
        console.log("Successful authentication, redirect home.");
        res.redirect("http://localhost:3000/dialog/facebook/"+req.user[0]._id+"/"+req.sessionID);
    });
router.get('/home', (req, res) => {
    console.log('its home component ');
})
router.post('/requestLoan', sessionChecker, (req, res) => {
    console.log('requestLoan', req.body, req.headers);

    let userObject = {
        userId: req.headers.userid,
        amount: req.body.amount,
        LoanReason: req.body.LoanReason
    }
    UserOperation.RequestLoan(userObject, res);

})
router.get('/fetchAllLoans', sessionChecker, (req, res) => {
    console.log('fetchAllLoans');
    let userObject = {
        sessionId: req.headers.authtoken,
        userId: req.headers.userid
    }
    UserOperation.FetchAllLoans(userObject, res);
})
router.put('/approveLoan', sessionChecker, (req, res) => {
    console.log('approveLoan');
    loanId = req.body.id;
    console.log('loanID', loanId);
    UserOperation.ApproveLoan(loanId, res);
})
router.put('/rejectloan', sessionChecker, (req, res) => {
    console.log('rejectLoan');
    loanId = req.body.id;
    console.log('loanID', loanId);
    UserOperation.RejectLoan(loanId, res);
})

router.get('/getLoan', sessionChecker, (req, res) => {
    console.log('getLoan');
    let userAuth = {
        sessionId: req.headers.authtoken,
        userId: req.headers.userid
    }
    UserOperation.FetchLoan(userAuth, res);
})

module.exports = router;