const { Admin } = require("../db/index");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

// Middleware for handling authentication
function adminMiddleware(req, res, next) {

    // You need to validate the admin using the jwt token in the authorization header.

    const token = req.headers.authorization;
    const words = token.split(" "); // to split the Bearer and the token(asdhavbjabj...)
    const jwtToken = words[1]; // accessing the token
    
    try {
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET);

    // Ideally there is a type which indicates if its a user or admin.(Diff bw authentication & authorization)
    if(decodedValue.username) {
        next();
    } else {
        res.status(403).json({
            msg: "You are not authenticated"
        })
    }
    } catch(e) {
        console.log("Error: " + e + "\nInvalid Inputs.");
    }
}

module.exports = adminMiddleware;