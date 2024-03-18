const jwt = require("jsonwebtoken")

const authenticateUser=async(req,res,next)=>{
    const token=req.headers['authorization']
    try{
        if(!token){
            return res.status(401).json('token is required')
        }
        const tokenData=await jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user={
            id:tokenData.id,
            role:tokenData.role
        }
        next()
    }catch(err){
        res.status(400).json('Internal server error')
    }
}
const authorizeUser=(role)=>{
    return(req,res,next)=>{
        if(!role.includes(req.user.role)){
            return res.status(400).json('unauthorized user')
        }
        next()
    }
}
module.exports={authenticateUser,authorizeUser}