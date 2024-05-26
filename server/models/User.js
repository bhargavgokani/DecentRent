const mongoose = require('mongoose')
const { createHmac , randomBytes} =  require('crypto');
const { ChildProcess } = require('child_process');
const { createToken , validateToken} = require('../utils/authentication');
const { type } = require('os');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    metaMaskAddress :{
        type : String,
        required : true,
    },
    salt: {
        type : String,
        
        
    },
    password : {
        type : String,
        required : true
        
    },

    savedResidency : [
        {
        type :Schema.Types.ObjectId,
        ref : "Residency",
        },
    ], 
    ownResidency : [
        {
            type :Schema.Types.ObjectId,
            ref : "Residency",
            },
    ]
},
   {timestamps : true}  
);

userSchema.pre("save" , function(next){
    const user = this;
    
    if( ! user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashPassword = createHmac('sha256' , salt ).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashPassword;

    next();
})

userSchema.static("matchPasswordAndGenrateToken" ,  async function(email , password){
    const user = await this.findOne({email : email});
    // console.log(user)
    if(!user)  throw new Error('User is not found !');

    const salt = user.salt;
    const hashPassword = user.password;

    const userProvidedPassword= createHmac('sha256' , salt ).update(password).digest("hex");

    if( hashPassword != userProvidedPassword) throw new Error('Incorrect password !')

    // hashPassword === userProvidedPassword

    else {
        const token = createToken(user);
        return token;
    }
})

module.exports = mongoose.model('User', userSchema);