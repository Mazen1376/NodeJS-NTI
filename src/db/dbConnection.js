import mongoose from "mongoose";

export const dbConnection = mongoose.connect('mongodb://localhost:27017/Project')
.then(()=>{console.log("Connected")})
.catch((error)=>{console.log(error)})