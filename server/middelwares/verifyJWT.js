const jwt=require('jsonwebtoken');
const verifyJWT=(req,res,next)=>{
    const authHeader=req.headers.authorization || req.headers.Authorization

    // authHeader="Bearer token"
    if(!authHeader?.startsWith("Bearer ")) return res.status(401).json({message :"unauthorized"});

    const token= authHeader.split(" ")[1]; // ["bearer","token"] we want the "token"

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        err && res.status(403).json({message:"Forbidden"});
        req.user=decoded.userInfo;

        next(); // next middlware
    });
}

module.exports={ 
    verifyJWT,
}