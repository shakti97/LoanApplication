const store=require('./sessionStore');

const checkerFunction=(sId,response,next)=>{
    store.get(sId,(error,session)=>{
        if(error){
            console.log('Errror while fetching session from sessionStore');
            response.send({
                isAuth : false
            })
        }else if(!session){
            console.log('No session Exist ');
            response.send({
                isAuth :false
            })
        }
        else{
            console.log('session exist and successfully find the session');
            next();
        }
    })
}
const sessionChecker =(request,response,next)=>{
    if(request.method=="POST"){
        checkerFunction("sessionId Value",response,next);
    }
    else{
        checkerFunction('sessionId Value',response,next);
    }
}