import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userModel } from '../db/models/userModel.js'
import { sendEmail } from '../util/sendEmail.js'
import { cartModel } from '../db/models/cartModel.js'


const getUsers = async (req,res)=>{                               //token to check if role : admin
    const users = await userModel.find()
    res.json(users)
}

const register =  async (req,res)=>{

    const exist = await userModel.findOne({email:req.body.email})
    if(exist) return res.json({ message: "u r already registered plz login"})

    req.body.password = bcrypt.hashSync(req.body.password, 8)

    const registeredUser = await userModel.insertOne(req.body)
    const userId = registeredUser._id
    
    if(registeredUser.isAdmin == false) {
        const createdCart = await cartModel.insertOne({userId})
    }
    
    sendEmail(req.body.email)

    registeredUser.password = undefined
    registeredUser.isAdmin = undefined
    res.json({ message: "registered successfully" , registeredUser})
}

const login =  async (req,res)=>{

    const emailExist = await userModel.findOne({email:req.body.email})
    if(!emailExist) return res.json({ message: "invalid email"})

    const passwordMatched = bcrypt.compareSync(req.body.password, emailExist.password)
    if(!passwordMatched) return res.json({ message: "invalid password"})

    const token = jwt.sign({_id:emailExist._id, isAdmin:emailExist.isAdmin},"any_secret_key") 
    
    res.json({ message: `welcome ${emailExist.name}` , token})
}

const updateUser =  async (req,res)=>{ 
    const {id} = req.params
    const updatedUser = await userModel.findByIdAndUpdate(id, {...req.body}, {new:true})
    res.json({ message: "updated successfully" , updatedUser})
}
const verifyEmail =  async (req,res)=>{ 
    const {email} = req.params

    jwt.verify(email, "any_secret_key", async(error,decoded)=>{
        if(error) return res.json({message:"invalid token"})
            await userModel.findOneAndUpdate({email:decoded.email}, {isConfirmed:true})
            res.json({message:"verified successfully"})
    })}

const deleteUser = async(req,res)=>{                                    //token to check if role : admin
     let {id}= req.params
     const deletedUser = await userModel.findByIdAndDelete(id)
      res.json({message:"deleted successfully", deletedUser})
}


export {
    register, 
    login,
    updateUser,
    verifyEmail,
    //admin
    getUsers,
    deleteUser
}



