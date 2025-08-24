import jwt from 'jsonwebtoken'

export const verifyingCartToken = (req,res,next)=>{
    jwt.verify(req.headers.token, "any_secret_key", (error, decoded)=>{
        if(error) return res.json({message : "invalid token"})
            req.decoded = decoded
            next()
    })
}