const JWT = require('jsonwebtoken')

const adminAuth = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    
    if (!token) return res.status(404).send({ message: "No token provided" });

    JWT.verify(token, process.env.SECRET_KEY_ADMIN, (err, decoded) => {
        if (err) return res.status(401).send({ message: "Unauthorized" });
        console.log(decoded.userId)
        req.body.creatorId = decoded.userId
        next();
    });
};

module.exports = adminAuth