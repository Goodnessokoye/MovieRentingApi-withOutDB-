const user = require("../models/user")

module.exports = function(req, res, next){
    //checking wether the user is admin or have the right to perform some operations
    if(!req.user.isAdmin) return res.status(403).send("Access denied");
    
    next();
}