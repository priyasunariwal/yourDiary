var jwt = require('jsonwebtoken');
const JWT_SECRET = 'priyaisabitch';
const fetchUser = (req,res,next)=>{
  //get the user from the jwt token and add id to req 
  const token = req.header('auth-token');
  if(!token){
    res.status(401).send({error: "please authenticate using a valid token"})
  }
  //hosakta hai user valid naa ho
  try{
  const data = jwt.verify(token,JWT_SECRET); //token or secret matching.
  req.user = data.user;
  
  next(); //it will call the next func that is async in route3 of auth file.
  }catch(error){
  res.status(401).send({error: "please authenticate using a valid token"});
  }
}

module.exports = fetchUser;
// The module.exports is a special object which is included in every JavaScript file in the Node.js application by default. The module is a variable that represents the current module, and exports is an object that will be exposed as a module. So, whatever you assign to module.exports will be exposed as a module.