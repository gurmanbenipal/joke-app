const jwt = require('jsonwebtoken');

function checkJWT(req, res, next) {
    // Get the JWT from the headers
    const token = req.headers.authorization.split(' ')[1]; // Assuming it's sent as "Bearer TOKEN"
    
    if (!token) {
        return res.status(401).send("No token provided");
    }

    // Verify and decode the JWT
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send("Invalid token");
        }

        // Set the req.user object
        req.user = decoded.user;
        next();
    });
}

module.exports = checkJWT;
