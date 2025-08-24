import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {            
    email:String,
    password:String,
    name:String,
    age:Number,
    isAdmin:
    {                                   
        type:Boolean,
        default:false
    },
    isConfirmed:
    {                                   
        type:Boolean,
        default:false
    }
    },
    {
        timestamps:true,
        versionKey:false
    }

)
export const userModel = mongoose.model('User', userSchema)