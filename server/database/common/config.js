const dotenv=require('dotenv');
dotenv.config();
const dbconfig={

    dbUrl: process.env.MONGOLAB_URI
}

module.exports=dbconfig;