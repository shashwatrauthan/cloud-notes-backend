const jwt = require("jsonwebtoken");

JWT_SECRET = "shashwatsecret";


const getuser = (req,res,next)=>{
    try{
    const token = req.header("auth-token");
    const data = jwt.verify(token,JWT_SECRET);
    req.id = data.id;
    }
    catch(error)
    {
        return res.status(401).json({error:"Invalid Token"});
    }

    next();
}

module.exports = getuser;