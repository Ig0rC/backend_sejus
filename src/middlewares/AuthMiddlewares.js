
const jwt = require('jsonwebtoken')


const AuthMiddlewares =  (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization){ 
        console.log('blz')
        return res.sendStatus(401);
    }
    const token = authorization.replace('Bearer', '').trim();
    try {
        const data = jwt.verify(token, 'secrete');
        const { id } = data;
        req.auth = id;
        
       next();
    } catch (error) {
        next(error)
    }
} 

module.exports = AuthMiddlewares;