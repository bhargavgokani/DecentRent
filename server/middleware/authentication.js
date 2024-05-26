const{validateToken} = require('../utils/authentication')
const secret = '$pratikTheGreat@123'
const jwt = require('jsonwebtoken');



const getTokenFromHeaders = (req) => {
    
    const authorization = req.headers.authorization; 
          if (authorization && authorization.startsWith('Bearer ')) {
        
               return authorization.split(' ')[1]; 
           }
    return null; 
  };

function authorize(req, res, next) {
    console.log('Authorization middleware called');
    console.log(req.headers.authorization)
    const token = getTokenFromHeaders(req)
   
    console.log('Token:', token);
    
    if (!token) {
                return res.status(401).json({ message: 'Unauthorized: No token provided' });
            }
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: 'Forbidden: Invalid token' });
                }
                
                req.user = decoded;
                console.log(req.user)
                next();
            });
    
}
module.exports = { authorize}