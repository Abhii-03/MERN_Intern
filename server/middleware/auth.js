const jwt=require("jsonwebtoken")
require("dotenv").config()

exports.auth = (req,res, next) =>{
    try {
        // extract jwt token      
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","")

        if(!token){
            return res.status(401)
            .json({
                success:false,
                message:"Token Missing"
            })
        }
        // verify token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decode)
            
            req.user = decode
        } catch (err) {
             return res.status(401)
             .json({
                success:false,
                message:"Invalid Token"
             })
        }
        
        next();
    } catch (err) {
        return res.status(501)
        .json({
            success:false,
            message:"somthing went wrong while verifying the token"
        })
    }
}