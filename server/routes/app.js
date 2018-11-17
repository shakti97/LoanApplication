const express=require('express');
const router=express.Router();
const UserOperation=require('../database/UserOperations.js');

router.post('/signUp',(req,res)=>{
    console.log('signUp');
    userObject=req.body.userDetails;
    UserOperation
})
router.post('/login',(req,res)=>{
    console.log('login');
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
router.post('/getLoan',sessionChecker,(req,res)=>{
    console.log('getLoan');
})