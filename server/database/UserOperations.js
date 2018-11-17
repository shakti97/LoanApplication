const userSchema=require('./schema/UserSchema.js');
const passwordHash = require('password-hash');
const config=require('../utils/config/auth.js');


const UserOperations={
        UserSignUp(userObject,response){
            console.log('UserSingUp UserOperation');
            userObject.password = passwordHash.generate(userObject.password);
            userSchema.create(userObject,(err,user)=>{
                if(err){
                    console.log('Error in SignUp',err);
                    response.status().send({
                        Error : err
                    })
                }
                else{
                    console.log('details added to the db at ',user._id);
                    response.status(200).send({
                        isSignUp : true
                    })
                }
            })
        },
        UserLogIn(userObject,response){
            console.log('UserLogIn UserOperation');
            userSchema.find({email : userObject.email},(err,userDoc)=>{
                if(err){
                    console.log('Error in fetching userId ',err)
                    response.status(500).send({
                        Error :err
                    })
                }
                else if(userDoc && userDoc.length>0){
                    console.log('Email id exist lets check the password');
                    let result = passwordHash.verify(userObject.password, userDoc[0].password);
                    if(result){
                    request.session.Id =userDoc[0]._id;
                    request.session.save((err)=>{
                        if(err){
                            console.log('error inSaving the Session ',err);
                            response.status(500).send({
                                Error : err
                            })
                        }
                        else{
                            console.log('session saved successfully');
                            response.status(200).send({
                                isLogin : true,
                                sessionId : request.sessionId
                            })
                        } 
                    })
                }
                }
            })
        },
        RequestLoan(loanObject,response){
            console.log('RequestLoan UserOperation');
        },
        ApproveLoan(loanObject,response){
            console.log('ApproveLoan UserOperation');
        },
        RejectLoan(loanObject,response){
            console.log('rejectLoan UserOperation');
        },
        FetchLoan(loanObject,response){
            console.log('FetchLoan UserOperation');
        }
}
module.exports=UserOperations;