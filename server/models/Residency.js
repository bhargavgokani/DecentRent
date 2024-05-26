const mongoose = require('mongoose')

const residencySchema = new mongoose.Schema({
    title : {
        type : String,
        reuired : true,
    },
    
    description :{
        type : String,
    },

    image : {
        type : String 
    },

    price :{
        type : Number
    },

    location : {
        type : String
    },

    country : {
       type : String
    },

    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",

    },
    reviews : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Review",
    }],

    createdAt : {
        type : Date,
        default : Date.now,
    },
})

const Residency = mongoose.model("Residency" , residencySchema)
module.exports = Residency;