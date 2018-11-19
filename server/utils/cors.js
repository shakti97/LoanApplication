const cors = (request, response, next)=>{
    response.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,userId,authToken");
    response.header('Access-Control-Allow-Credentials','true');
    response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    
    next();
  }
module.exports=cors;