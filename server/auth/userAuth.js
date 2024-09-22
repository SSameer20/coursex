const JWT = require('jsonwebtoken')

const userAuth = (req, res, next) => {
    const token = req.headers['authorization'].split(" ")[1];
    
    if (!token) return res.status(404).send({ message: "No token provided" });

    JWT.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).send({ message: "Unauthorized" });
        req.body.userId = decoded.userId
        next();
    });
};

module.exports = userAuth