const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('key.pub');

function verifyToken(req, res, next){
    const token = req.body.token || req.query.token || req.headers.authorization;
    if(token){
        jwt.verify(token.split(" ")[1], privateKey, function(err,decoded){
            if(err){
                return res.status(403).json({status : 403,success:false, message:"Échec de l'authentification du jeton."});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).json({
            status : 403,	
            success: false,
            message: 'Pas de jeton fourni.'
        });
    }
}

module.exports = verifyToken;