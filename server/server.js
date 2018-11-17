const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const session=require('express-session');
const path=require('path');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const cors=require('./utils/cors.js');
app.use(cors);
const passport=require('passport');
const appRoute=require('./routes/appRoute.js');
const store=require('./utils/sessionHandling/sessionstore');
app.use(session({
store : store,
    secret: 'shakti',
    resave: false,
    saveUninitialized: true,
    cookie: {

        httpOnly: false,
        secure: false,
        maxAge: 1000*60*5
    }

}));
app.use(passport.initialize());
app.use('/',appRoute);

app.listen(process.env.PORT || 8080,()=>{
    console.log('Server Started');
})