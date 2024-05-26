const jwt = require('jsonwebtoken');
const secret = '$pratikTheGreat@123'

function createToken(user){
    const payload = {
        _id : user._id,
        userName : user.userName,
        email : user.email

    };
    // {expiresIn :  Math.floor(Date.now() / 1000) + (7*24*60 * 60)}

    const token = jwt.sign(payload , secret ,{expiresIn :  Math.floor(Date.now() / 1000) + (7*24*60 * 60)} );
    return token;

}

function validateToken(token){
    const payload = jwt.verify(token , secret);
    return payload
}

module.exports = { createToken , validateToken};