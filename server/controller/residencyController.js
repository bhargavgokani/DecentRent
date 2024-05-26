const asyncHandler = require( 'express-async-handler');
const Residency = require('../models/Residency');
const User = require('../models/User')



module.exports.getAllResidency = asyncHandler(async(req , res)=>{
    try{
     let allResidency = await Residency.find({});

    console.log(Residency)
    res.send(allResidency)
} catch(err){
    throw new Error (err.message);
}
})
module.exports.getSavedRes = asyncHandler(async(req , res)=>{
    try{
        const email = req.user.email
        let user = await User.findOne({email : email}).populate('savedResidency');
        console.log(user.savedResidency)
        res.send(user.savedResidency)
       
} catch(err){
    throw new Error (err.message);
}
})

module.exports.getOwnedRes = asyncHandler(async(req , res)=>{
    try{
        const email = req.user.email
        let user = await User.findOne({email : email}).populate('ownResidency');
        console.log(user.ownResidency)
        res.send(user.ownResidency)
       
} catch(err){
    throw new Error (err.message);
}
})

module.exports.getResidency = asyncHandler(async(req , res)=>{
    try{
        let {id} = req.params;
        let residency = await Residency.findById({_id : id}).populate({
            path: 'reviews',
            populate: {
              path: 'author',
              model: 'User'
            }
            
          })
    
        res.send({
            message : "get the residency",
            Residency : residency
        })
    
        console.log(residency)
    } catch(err){
        throw new Error (err.message);
       
    }
})

module.exports.createResidency = asyncHandler(async(req , res)=>{
    try{
        let { title , description ,image , price , location , country } = req.body;
        const email = req.user.email
        console.log(req.body)

        const userdetail = await User.findOne({email : email});
        const  owner = await userdetail.id;
        
        const residency = new Residency({title ,
         description ,image, price , location , country ,  owner
        })
        await residency.save();
        const rId = residency._id;
        await User.updateOne({email : email} , {$push : {ownResidency : rId}});
        const user = await User.findOne({email : email});
        console.log(user)
       
        console.log(residency)

        res.send("residency created succesfully")
       
    }catch(err){
        throw new Error(err.message)
        

    }
})

module.exports.deleteResidency = asyncHandler(async(req , res)=>{
    try{
       let {id} = req.params;
       const email = req.user.email;
       const residency = await Residency.findByIdAndDelete({_id : id})
       const rId = residency._id;
       await User.updateOne({email : email} , {$pull : {ownResidency : rId}});
       const user = await User.findOne({email : email});
       console.log(user)
       res.send("residency deleted successfully")
       console.log(residency)

    }
    catch(err){
        throw new Error(err.message);
     }
})

module.exports.updateResidency = asyncHandler(async(req , res)=>{
    try{
        let {id} = req.params;
        let {title , description ,image, price , location , country} = req.body;

        const residency = await Residency.findById({_id : id })
        residency.title = title
        residency.description= description
        residency.image = image
        residency.price = price
        residency.location= location
        residency.country = country

        await residency.save();

        res.send( {
            message : "residency updated successfull",
            Residency : residency
        })
    }
    catch(err){
        throw new Error(err.message)

    }
})