const asyncHandler = require( 'express-async-handler');
const Residency = require('../models/Residency');
const User = require('../models/User')
const Review = require('../models/Review')

module.exports.addReview = asyncHandler(async(req , res)=>{

  try{

      let {id } = req.params
      let email = req.user.email;

      let { comment , rating} = req.body
      console.log(id , email , comment , rating)

      const residency = await Residency.findById({_id : id})
      const user = await User.findOne({email : email})

      const review = await new Review({
          comment : comment , 
          rating : rating ,
          author : user?.id,
  })

     await review.save()
     console.log(review)
     await Residency.updateOne({_id : id } , {$push : { reviews : review._id}})

    res.send({
         message : "review added !",
         residency : residency
        })

      console.log(residency)
  }
     catch(err){
    throw new Error (err.message);
  }
})

module.exports.deleteReview = asyncHandler( async(req , res)=>{
    try{
      
     let{id , reviewId} = req.params
      
     const residency = await Residency.findById({_id : id})
     await Residency.findByIdAndUpdate({_id : id} , {$pull :{ reviews : reviewId}});
     await Review.findByIdAndDelete(reviewId);

     res.send( "review deleted successfully")
 
    }catch(err)
    {
    throw new Error (err.message);
    }
 })