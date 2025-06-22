const jwt = require("jsonwebtoken");

const authentacateToken = (req,res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(token === null){
        return res.status(401).json({message: "Authentication token required"});
    }

    jwt.verify(token, "bookstore", (err,user) => {
        if(err){
            res.status(401).json({message:"token expired please login again"});
        }
    req.user = user;
    next();
    })
} 

module.exports = {authentacateToken}