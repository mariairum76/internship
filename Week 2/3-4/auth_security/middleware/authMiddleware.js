const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){

    const token = req.header('token');

    if(!token){

        return res.status(403).json('Not Authorized');
    }

    try {

        const verify = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        req.user = verify;

        next();

    } catch (err) {

        res.status(401).json('Invalid Token');

    }
}