const mongoose=require('mongoose');
const dbconfig=require('./config.js');

// var options=;
mongoose.connect(dbconfig.dbUrl,{useNewUrlParser: true}).then(
    (res)=>{
        console.log('connected to mlab');
    }
).catch(()=>{
    console.log('Connection to db failed');
})
mongoose.set('useCreateIndex', true);

module.exports=mongoose;