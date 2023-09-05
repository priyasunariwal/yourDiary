const express = require('express');
const router = express.Router();
const User = require('../models/User');
const fetchUser = require('../middleware/fetchUser'); 
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { clear } = require('@testing-library/user-event/dist/clear');

const JWT_SECRET = 'priyaisabitch';

//ROUTE1 : create a User using: POST "/api/auth/createuser" doesnt require Auth No login required 
router.post('/createuser',[
  //validation of user info
    body('name','enter a valid name').isLength({ min: 3 }),
    body('email','enter a valid email').isEmail(),
    body('password','password must be atleast 5 characters').isLength({ min: 5 }),
], async (req,res)=>{
  let  success = false; //kaam aayega front end mei signup huva ke nhi dekhne ko variable
    
  //if there are errors,return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array() });
    }
    //check whether the user with this email exists
    try{
    let user = await User.findOne({email: req.body.email});
    if(user){
      return res.status(400).json({error:"Sorry user with this email alreadyexists"});
    }
    const salt = await bcrypt.genSalt(10) //generates salt 
    const secPass = await bcrypt.hash(req.body.password,salt);
    //create a new 
    user = await  User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
    //   .then(user => res.json(user))
    //   .catch(err=> {console.log(err)
    //  res.json({error: 'please enter a unique email',message: err.message})   }); //error aayega console pe and json pe if duplicate values daali
     
  //***related to jwt token
       const data = {
        user:{
          id: user.id

        }
       }
        //signing data/secret
    const authToken = jwt.sign(data,JWT_SECRET); 
    success = true;  
    res.status(200).json({success,authToken});
     //catch errors
    }catch(error){
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  })




//ROUTE2 :authenticate a User using: POST "/api/auth/login" doesnt require Auth No login required 
router.post('/login',[
  
  body('email','enter a valid email').isEmail(),
  body('password','password cannot be empty').exists(), 

], async (req,res)=>{
  let  success = false; //kaam aayega front end mei login huva ke nhi dekhne ko variable
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  
  }

   const {email,password} = req.body;
   try{
   
     let user = await User.findOne({email}); //finding if the user is in system or not.
      if(!user){
        
        return res.status(400).json({error:"Please try to login in with correct credentials"});
      }
        //asynchronious function hai islliye await karna padega
     const passwordCompare = await bcrypt.compare(password,user.password); //automatic hash dekh lega entered password ka or check karega system me password hashes ke saath and true false return karta hai.
       if(!passwordCompare){
        
        return res.status(400).json({error:"Please try to login in with correct credentials"});
       }
       //if sab sahi huva matlab upar vaale do conditions toh aage jayega or payload matlab user ka data hai
       const data = {
        user:{
          id: user.id

        }
      }
            //signing data/secret
    const authToken = jwt.sign(data,JWT_SECRET); 
    success = true; 
    res.json({success, authToken});
      }catch(error){
        console.error(error.message);
        res.status(500).send("internal server error occured");
   }

});

//ROUTE3 :get loggedin  User details using: POST "/api/auth/getuser" login required 
router.post('/getuser',fetchUser, async (req,res)=>{ 
try{
  const userId =req.user.id;
   const user = await User.findById(userId).select("-password")
    //will find by id and select every info except passsword
    res.send(user);
 }catch(error){
  console.error(error.message);
  res.status(500).send("internal server error occured");
 }

});


module.exports = router


// An async function runs synchronously until the first await keyword. This means that within an async function body, all synchronous code before the first await keyword executes immediately.
//middleware ek function hai jo call kiya jayega jab bhi login required par request aayegi