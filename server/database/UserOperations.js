const userSchema = require('./schema/UserSchema.js');
const passwordHash = require('password-hash');
const config = require('../utils/config/auth.js');
const uniqueString = require('unique-string');

const UserOperations = {
    UserSignUp(userObject, response) {
        console.log('UserSingUp UserOperation');
        userObject.password = passwordHash.generate(userObject.password);
        userSchema.create(userObject, (err, user) => {
            if (err) {
                console.log('Error in SignUp', err);
                response.status(500).send({
                    Error: err
                })
            } else {
                console.log('details added to the db at ', user._id);
                response.status(200).send({
                    isSignUp: true,
                    userId: user._id
                })
            }
        })
    },
    adminSignUp(userObject) {
        userObject.password = passwordHash.generate(userObject.password);
        userSchema.create(userObject, (err, user) => {
            if (err) {
                console.log('Error in SignUp', err);
            } else {
                console.log('details added to the db at ', user._id);
            }
        })
    },
    addRole(userObject, response) {
        console.log('userObject ', userObject);
        userSchema.updateOne({
            _id: userObject.userId
        }, {
            $set: {
                "role": userObject.role
            }
        }, (err) => {
            if (err) {
                console.log('Error while Adding role');
                response.status(500).send({
                    Error: err
                })
            } else {
                console.log('role added successfully');
                response.status(200).send({
                    isRollAdded: true
                })
            }
        })
    },
    UserLogIn(userObject, request, response) {
        console.log('UserLogIn UserOperation');
        userSchema.find({
            email: userObject.email
        }, (err, userDoc) => {
            if (err) {
                console.log('Error in fetching userId ', err)
                response.status(500).send({
                    Error: err
                })
            } else if (userDoc && userDoc.length > 0) {
                console.log('Email id exist lets check the password');
                let result = passwordHash.verify(userObject.password, userDoc[0].password);
                if (result) {
                    request.session.Id = userDoc[0]._id;
                    request.session.save((err) => {
                        if (err) {
                            console.log('error inSaving the Session ', err);
                            response.status(500).send({
                                Error: err
                            })
                        } else {
                            console.log('session saved successfully');
                            let Routes;
                            if (userDoc[0].role === "Customer") {
                                Routes = ['/customer', '/']
                            } else if (userDoc[0].role === 'Lender') {
                                Routes = ['/lender', '/']
                            }
                            response.status(200).send({
                                isLogin: true,
                                sessionId: request.sessionID,
                                userId: userDoc[0].id,
                                role: userDoc[0].role,
                                routes : Routes
                            })
                        }
                    })
                }
            }
        })
    },
    RequestLoan(loanObject, response) {
        console.log('RequestLoan UserOperation');
        var uniqueId = uniqueString();
        console.log('uniqueId ', uniqueId);
        const loanObj = {
            loanId: uniqueId,
            amount: loanObject.amount,
            status: "Pending",
            LoanReason: loanObject.LoanReason
        }
        console.log(loanObj);
        console.log(loanObject.userId);
        userSchema.find({
            _id: loanObject.userId
        }, (err, userDoc) => {
            if (userDoc) {
                console.log("id ", userDoc)
            }
        })
        userSchema.updateOne({
            _id: loanObject.userId
        }, {
            $push: {
                loans: loanObj
            }
        }, (err, userDoc) => {
            if (err) {
                console.log('error while requesting for new Loan');
                response.status(500).send({
                    Error: err
                })
            } else {
                console.log('loan request successful', userDoc._id);
                response.status(200).send({
                    loanRequestSuccess: true
                })
            }
        })

    },
    RejectLoan(loanId, response) {
        console.log('RejectLoan UserOperation');
        userSchema.find({
            "loans.loanId": loanId
            // "loans": {$elemMatch : {'loanId' : loanId}}
        }, (err, userDoc) => {
            if (err) {
                console.log(err);
            } else if (userDoc) {
                console.log("id ", userDoc)
            }
        })
        userSchema.updateOne({
            "loans.loanId": loanId
        }, {
            $set: {
                "loans.$.status": "Rejected"
            }
        }, (err, userDoc) => {
            if (err) {
                console.log('error while updating the loan Status ', err);
                response.status(500).send({
                    Error: err
                })
            } else {
                console.log('Successfully rejected the loan Request ', userDoc);
                response.status(200).send({
                    SuccessfullyRejected: true
                })
            }
        })
    },
    ApproveLoan(loanId, response) {
        console.log('ApproveLoan UserOperation');
        userSchema.find({
            "loans.loanId": loanId
            // "loans": {$elemMatch : {'loanId' : loanId}}
        }, (err, userDoc) => {
            if (err) {
                console.log(err);
            } else if (userDoc) {
                console.log("id ", userDoc)
            }
        })
        userSchema.updateOne({
            "loans.loanId": loanId
        }, {
            $set: {
                "loans.$.status": "Approved"
            }
        }, (err, userDoc) => {
            if (err) {
                console.log('error while updating the loan Status ', err);
                response.status(500).send({
                    Error: err
                })
            } else {
                console.log('Successfully approved the loan Request ', userDoc);
                response.status(200).send({
                    SuccessfullyApproved: true
                })
            }
        })
    },
    FetchAllLoans(userObject, response) {
        let Loans = []
        console.log('FetchAll Loans');
        userSchema.find({
            role: 'Customer'
        }, (err, userDoc) => {
            if (err) {
                console.log('userDoc ', userDoc);
                response.status(500).send({
                    Error: err
                })
            } else {
                console.log('users ', userDoc);
                for (let i = 0; i < userDoc.length; i++) {
                    Loans.push(...userDoc[i].loans);
                    console.log('loans ', Loans);
                }
                response.status(200).send({
                    loans: Loans
                })
            }
        })
    },
    FetchLoan(loanObject, response) {
        console.log('FetchLoan UserOperation');
        console.log(loanObject);
        userSchema.find({
            _id: loanObject.userId
        }, (err, userDoc) => {
            if (userDoc) {
                console.log("id ", userDoc)
            }
        })
        userSchema.find({
            _id: loanObject.userId
        }, (err, userDoc) => {
            if (err) {
                console.log('error while fetching the loans ')
            } else if (userDoc && userDoc.length > 0) {
                console.log('success found the person ', userDoc[0]._id);
                response.status(200).send({
                    loans: userDoc[0].loans
                })
            } else {
                console.log('userDoc ', userDoc);
                console.log('No loans found ');
                response.status(200).send({
                    loans: []
                })
            }
        })
    }
}
module.exports = UserOperations;