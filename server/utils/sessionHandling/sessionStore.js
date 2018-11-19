const sessionstore=require('sessionstore');
const config=require('../../Database/common/config.js');
var store=sessionstore.createSessionStore({

    type: 'mongodb',
        host: 'localhost',         
        port: 27017,               
        dbName: 'loan_application',       
        collectionName: 'sessions',
        timeout: 100000,
        url: config.dbUrl
});



module.exports=store;