const mongoose=require('../common/connection.js');
const schema=mongoose.Schema;
const userSchema=schema({
    userId : schema.Types.ObjectId,
    name : {
        type :String,
        maxlength : 100
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    role : {
        type : String
    },
    loans : [{
        loanId : {
            type : String
        },
        amount : {
            type : Number
        },
        status : {
            type : String
        },
        LoanReason :{
            type : String,
            maxlength :200
        }
    }]
})
var userModel=mongoose.model('users',userSchema);

module.exports=userModel;