const asyncHandler = require( 'express-async-handler');
const Residency = require('../models/Residency');
const User = require('../models/User')
const{validateToken} = require('../utils/authentication')



module.exports.register = asyncHandler(async(req , res)=>{
try {
     let {userName , email ,  password , metaMaskAddress } = req.body;
  
     let user =await User.findOne({ email : email});
     console.log(user) 
     if(user){
        res.send("You are already register")
      }
     else {
        const user = await new User({
        userName, 
        email,
        password , 
        metaMaskAddress
      })
  
    await user.save()
    res.send("register successfully !")
    console.log(user)
     }
    }catch(err){
        throw new Error (err.message);
        }
  });

  module.exports.getAddress = asyncHandler(async(req , res)=>{
     try{

      const {email} = req.body;
      console.log("hi")
      // const email = req.user.email
      console.log(email)

      const user = await User.findOne({email : email});
      console.log(user);
      res.send({user : user})

     }catch(err){
      throw new Error (err.message);
    }
  })

module.exports.saveRes = asyncHandler(async(req , res)=>{
    try{
      let { id} = req.params
      const email = req.user.email
      
      const residency = await Residency.findById({_id : id});
      console.log(residency)

      const user = await User.findOne({email : email});
      console.log(user)
      if (user.savedResidency.includes(id)){
        console.log("already saved this residency")
        res.send("already saved this residency")
      }
     else{
           await User.updateOne({email: email} , {$push : {savedResidency : id}})
           console.log(user)
           console.log("saved residency")
           res.send("saved residency")
     }
    }catch(err){
      throw new Error (err.message);
    }
  });

module.exports.unsaveRes = asyncHandler(async(req , res)=>{
    try{
      let { id} = req.params
      const email = req.user.email
      const residency = await Residency.findById({_id : id});

      const user = await User.findOne({email : email});
      if (user.savedResidency.includes(id)){
        await User.updateOne({email: email} , {$pull : {savedResidency : id}})
        console.log("remove from saved residency");
       
        res.send("remove from saved residency")
        }
    }catch(err){
      throw new Error (err.message);
    }
  });

module.exports.login = asyncHandler( async(req , res)=>{
    try{
      let {email , password} = req.body;
      let token= await User.matchPasswordAndGenrateToken(email , password);
      console.log(token)
  
      if(token){
        const user = await validateToken(token)
        console.log(user)
       
       res.send({message : "you are login" , user : user , Token : token});
      
        return true
       }
       else{
        res.send("register")
       
       }
      }
    catch(err){
      throw new Error (err.message);
    }
  });

module.exports.logout =asyncHandler(async (req , res)=>{
  
    console.log("logout")
    res.send("logout successfully")
  });

  module.exports.getUser = asyncHandler(async(req , res)=>{
    try{
     const {id} = req.body;
     const data = await User.findById(id);
     console.log(data);
     res.send({user : data});
    } catch(err){
      throw new Error (err.message);
    }
  })