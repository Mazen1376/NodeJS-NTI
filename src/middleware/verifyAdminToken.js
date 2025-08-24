import jwt from 'jsonwebtoken'

export const verifyAdminToken = (req,res,next)=>{
    jwt.verify(req.headers.token, "any_secret_key", (error, decoded)=>{

        if(error) return res.json({message : "invalid token"})
        req.decoded = decoded
        if(req.decoded.isAdmin == false) return res.json({message: "unauthorized access"})
        next()
    })
}