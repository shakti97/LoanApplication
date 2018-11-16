const mongoose=require('mongoose');
const dbconfig=require('./config.js');

var options={useNewUrlParser: true}
mongoose.connect(dbconfig.dbUrl,options);
mongoose.connection.once('open',()=>{
    console.log('mlab connected');
})

module.exports=mongoose;