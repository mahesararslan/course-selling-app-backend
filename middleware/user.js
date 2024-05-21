const { User } = require("../db/index")
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

// Middleware for handling authentication
function userMiddleware(req, res, next) {

    // You need to validate the user using the jwt token in the authorization header.

    const token = req.headers.authorization;
    const words = token.split(" "); // to split the Bearer and the token(asdhavbjabj...)
    const jwtToken = words[1]; // accessing the token
    
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);

    if(decodedValue.username) {
        // you can populate the req object with different values(ex: req.anyValue = smth) 
        // and it can be accessed by the remaining middlewares.
        req.username = decodedValue.username; // passes value to the next middleware/main function.
        next();
    } else {
        res.status(403).json({
            msg: "You are not authenticated"
        })
    }
}

module.exports = userMiddleware;